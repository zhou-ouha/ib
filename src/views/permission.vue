<template>
    <div id="user">
        <h1>权限信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加权限"
        @click="showPermission = true"></el-button></h1>
            <el-dialog title="权限信息" :visible.sync="showPermission">
                <el-form :model="permissionForm1">
                    <el-form-item label="权限编码" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm1.permissionCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限名称" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm1.permissionName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限描述" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm1.permissionDescribe" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showPermission = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="permissionList.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
            prop="permissionCode"
            label="权限编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="permissionName"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="permissionDescribe"
            width="180"
            label="权限描述">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="updateIndex(scope.$index)" type="success" size="small">修改</el-button>
                <el-dialog title="权限信息" :visible.sync="permissionUpdateShow" :modal="false">
                    <el-form :model="permissionForm2">
                        <el-form-item label="权限编码" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm2.permissionCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="权限名称" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm2.permissionName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="权限描述" :label-width="formLabelWidth">
                        <el-input v-model="permissionForm2.permissionDescribe" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="permissionUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="permissionDelShow"
                        width="30%"
                        :modal="false">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="permissionDelShow = false">取 消</el-button>
                            <el-button type="primary" @click="deleteByName(delindex)">确 定</el-button>
                        </span>
                </el-dialog>
            </template>
            </el-table-column>
            </el-table>
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="pageInfo.pageSize"
            layout="total, prev, pager, next"
            :total="pageInfo.pageTotal"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageInfo: {
                currentPage: 1,
                pageSize: 8,
                pageTotal: 20
            },
            permissionList:[],//用户信息表
            showPermission:false,//控制添加项的展示与隐藏
            permissionDelShow:false,//控制用户删除界面展开与隐藏
            permissionUpdateShow:false,//控制用户修改界面展开与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            permissionForm1:{
                permissionCode:'',
                permissionName:'',
                permissionDescribe:'',
                db:'permission'
            },//添加的用户信息表内容
            permissionForm2:{
                permissionCode:'',
                permissionName:'',
                permissionDescribe:'',
                mark:'',
                db:'permission'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"permission"
            }
        }).then(res=>{
                console.log(res);
                this.permissionList = res.data;
                this.pageInfo.pageTotal = res.data.length;
            }
        )
    },
    methods:{
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
        },
        delIndex(index){
            this.permissionDelShow = true;
            this.delindex = index;
            console.log(this.delindex)
        },
        updateIndex(index){
            this.permissionUpdateShow = true;
            this.updateindex = index;
            this.permissionForm2.permissionCode=this.permissionList[index].permissionCode;
            this.permissionForm2.mark=this.permissionList[index].permissionCode;
            this.permissionForm2.permissionName=this.permissionList[index].permissionName;
            this.permissionForm2.permissionDescribe=this.permissionList[index].permissionDescribe;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        add(){
            console.log(this.carForm1);
            this.$http.post('http://127.0.0.1:8000/add',this.permissionForm1).then(res=>{
                this.permissionList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.permissionList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            },error=>{
                console.log(error);
            });
            this.showPermission = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.permissionList[index].permissionCode,
                    db:"permission"
                }
            }).then(res => {
                this.permissionList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.permissionList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.permissionDelShow = false;
        },
        update(index){
            console.log(this.permissionForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.permissionForm2).then(res => {
                this.permissionList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.permissionList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.permissionUpdateShow = false;
        }
    }
}
</script>
<style scoped>
#user{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>