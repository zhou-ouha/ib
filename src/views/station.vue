<template>
    <div id="user">
        <h1 style="font-size:20px;">站点信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加站点"
        @click="showStation = true" v-if="auth == 1 || auth == 2">
        </el-button>
        <el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="无权限"
        @click="showStation = true" v-else disabled></el-button></h1>
            <el-dialog title="站点信息" :visible.sync="showStation">
                <el-form :model="stationForm1">
                    <el-form-item label="站点编码" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.stationCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="站点名称" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.stationName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="经度" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.longitude" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.latitude" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="区域" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.region" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="街道" :label-width="formLabelWidth">
                        <el-input v-model="stationForm1.street" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showStation = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="stationList.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)"
            stripe
            style="width: 100%">
            <el-table-column
            prop="stationCode"
            label="站点编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="stationName"
            label="站点名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="longitude"
            width="180"
            label="经度">
            </el-table-column>
            <el-table-column
            prop="latitude"
            width="180"
            label="纬度">
            </el-table-column>
            <el-table-column
            prop="region"
            width="180"
            label="区域">
            </el-table-column>
            <el-table-column
            prop="street"
            width="180"
            label="街道">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="updateIndex(scope.$index)" type="success" size="small" 
                v-if="auth == 1 || auth == 2">修改</el-button>
                <el-button @click="updateIndex(scope.$index)" type="success" size="small" 
                v-else disabled  title="无权限">修改</el-button>
                <el-dialog title="站点信息" :visible.sync="stationUpdateShow" :modal="false">
                    <el-form :model="stationForm2">
                        <el-form-item label="站点编码" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.stationCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="站点名称" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.stationName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="经度" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.longitude" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.latitude" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="区域" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.region" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="街道" :label-width="formLabelWidth">
                        <el-input v-model="stationForm2.street" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="stationUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;"  v-if="auth == 1 || auth == 2">删除</el-button>
                <el-button @click="delIndex(scope.$index)"
                type="danger" size="small" style="margin-left:5px;"   v-else disabled title="无权限">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="stationDelShow"
                        width="30%"
                        :modal="false"
                        :before-close="handleClose">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="stationDelShow = false">取 消</el-button>
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
            auth:'',
            stationList:[],//信息表
            showStation:false,//控制添加项的展示与隐藏
            stationDelShow:false,//控制删除界面展开与隐藏
            stationUpdateShow:false,//控制修改界面展开与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            //添加信息表内容
            stationForm1:{
                stationCode:'',
                stationName:'',
                longitude:'',
                latitude:'',
                region:'',
                street:'',
                db:'station'
            },
            //修改信息表内容
            stationForm2:{
                stationCode:'',
                stationName:'',
                longitude:'',
                latitude:'',
                region:'',
                street:'',
                mark:'',
                db:'station'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.auth = window.sessionStorage.getItem("token");
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"station"
            }
        }).then(res=>{
                console.log(res);
                this.stationList = res.data;
                this.pageInfo.pageTotal = res.data.length;
            }
        )
    },
    methods:{
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
        },
        delIndex(index){
            this.stationDelShow = true;
            this.delindex = index;
        },
        updateIndex(index){
            this.stationUpdateShow = true;
            this.updateindex = index;
            this.stationForm2.stationCode=this.stationList[index].stationCode
            this.stationForm2.stationName=this.stationList[index].stationName
            this.stationForm2.longitude=this.stationList[index].longitude
            this.stationForm2.latitude=this.stationList[index].latitude
            this.stationForm2.region=this.stationList[index].region
            this.stationForm2.street=this.stationList[index].street
            this.stationForm2.mark=this.stationList[index].stationCode
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        add(){
            console.log(this.stationForm1);
            this.$http.post('http://127.0.0.1:8000/add',this.stationForm1).then(res=>{
                this.stationList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.stationList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            },error=>{
                console.log(error);
            });
            this.showStation = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.stationList[index].stationCode,
                    db:"station"
                }
            }).then(res => {
                this.stationList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.stationList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.stationDelShow = false;
        },
        update(index){
            console.log(this.stationForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.stationForm2).then(res => {
                this.stationList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.stationList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.stationUpdateShow = false;
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
    overflow: hidden;
}
</style>