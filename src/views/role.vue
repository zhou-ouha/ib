<template>
    <div id="user">
        <h1>角色信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加角色"
        @click="showRole = true"></el-button></h1>
            <el-dialog title="填写角色信息" :visible.sync="showRole">
                <el-form :model="roleForm1">
                    <el-form-item label="角色编码" :label-width="formLabelWidth">
                        <el-input v-model="roleForm1.roleCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" :label-width="formLabelWidth">
                        <el-input v-model="roleForm1.roleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" :label-width="formLabelWidth">
                        <el-input v-model="roleForm1.roledescribe" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showRole = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="roleList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="roleCode"
            label="角色编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="roledescribe"
            width="180"
            label="角色描述">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="updateIndex(scope.$index)" type="success" size="small">修改</el-button>
                <el-dialog title="角色信息" :visible.sync="roleUpdateShow" :modal="false">
                    <el-form :model="roleForm2">
                        <el-form-item label="角色编码" :label-width="formLabelWidth">
                        <el-input v-model="roleForm2.roleCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" :label-width="formLabelWidth">
                        <el-input v-model="roleForm2.roleName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色描述" :label-width="formLabelWidth">
                        <el-input v-model="roleForm2.roledescribe" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roleUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="roleDelShow"
                        width="30%"
                        :modal="false">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="roleDelShow = false">取 消</el-button>
                            <el-button type="primary" @click="deleteByName(delindex)">确 定</el-button>
                        </span>
                </el-dialog>
            </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            roleList:[],//用户信息表
            showRole:false,//控制添加项的展示与隐藏
            roleDelShow:false,//控制用户删除界面展开与隐藏
            roleUpdateShow:false,//控制用户修改界面展开与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            roleForm1:{
                roleCode:'',
                roleName:'',
                roledescribe:'',
                db:'role'
            },//添加的用户信息表内容
            roleForm2:{
                roleCode:'',
                roleName:'',
                roledescribe:'',
                mark:'',
                db:'role'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"role"
            }
        }).then(res=>{
                console.log(res);
                this.roleList = res.data;
                this.pageInfo.pageTotal = res.data.length;
            }
        )
    },
    methods:{
        delIndex(index){
            this.roleDelShow = true;
            this.delindex = index;
            console.log(this.delindex)
        },
        updateIndex(index){
            this.roleUpdateShow = true;
            this.updateindex = index;
            this.roleForm2.roleCode=this.roleList[index].roleCode;
            this.roleForm2.mark=this.roleList[index].roleCode;
            this.roleForm2.roleName=this.roleList[index].roleName;
            this.roleForm2.roledescribe=this.roleList[index].roledescribe;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        add(){
            console.log(this.roleForm1);
            this.$http.post('http://127.0.0.1:8000/add',this.roleForm1).then(res=>{
                this.roleList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.roleList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            },error=>{
                console.log(error);
            });
            this.showRole = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.roleList[index].roleCode,
                    db:"role"
                }
            }).then(res => {
                this.roleList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.roleList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.roleDelShow = false;
        },
        update(index){
            console.log(this.roleForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.roleForm2).then(res => {
                this.roleList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.roleList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.roleUpdateShow = false;
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