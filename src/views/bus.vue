<template>
    <div id="user">
        <h1>车辆信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加车辆"
        @click="showCar = true"></el-button></h1>
            <el-dialog title="车辆信息" :visible.sync="showCar">
                <el-form :model="carForm1">
                    <el-form-item label="车辆编码" :label-width="formLabelWidth">
                        <el-input v-model="carForm1.busCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" :label-width="formLabelWidth">
                        <el-input v-model="carForm1.busLicense" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆类型" :label-width="formLabelWidth">
                        <el-input v-model="carForm1.busType" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="carForm1.busStatus" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="起运时间" :label-width="formLabelWidth">
                        <el-input v-model="carForm1.startTime" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showCar = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="carList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="busCode"
            label="车辆编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="busLicense"
            label="车牌号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="busType"
            width="180"
            label="车辆类型">
            </el-table-column>
            <el-table-column
            prop="busStatus"
            width="180"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="startTime"
            width="180"
            label="起运时间">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="updateIndex(scope.$index)" type="success" size="small">修改</el-button>
                <el-dialog title="车辆信息" :visible.sync="carUpdateShow" :modal="false">
                    <el-form :model="carForm2">
                        <el-form-item label="车辆编码" :label-width="formLabelWidth">
                        <el-input v-model="carForm2.busCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号" :label-width="formLabelWidth">
                        <el-input v-model="carForm2.busLicense" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车辆类型" :label-width="formLabelWidth">
                        <el-input v-model="carForm2.busType" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="carForm2.busStatus" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="起运时间" :label-width="formLabelWidth">
                        <el-input v-model="carForm2.startTime" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="carUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="carDelShow"
                        width="30%"
                        :modal="false">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="carDelShow = false">取 消</el-button>
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
            carList:[],//用户信息表
            showCar:false,//控制添加项的展示与隐藏
            carDelShow:false,//控制用户删除界面展开与隐藏
            userUpdateShow:false,//控制用户修改界面展开与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            carForm1:{
                busCode:'',
                busLicense:'',
                busType:'',
                busStatus:'',
                startTime:'',
                db:'bus'
            },//添加的用户信息表内容
            carForm2:{
                busCode:'',
                busLicense:'',
                busType:'',
                busStatus:'',
                startTime:'',
                mark:'',
                db:'bus'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"bus"
            }
        }).then(res=>{
                console.log(res);
                for(let i = 0;i < res.data.length;i ++){
                    res.data[i].startTime = res.data[i].startTime.slice(0,10);
                }
                this.carList = res.data;
            }
        )
    },
    methods:{
        delIndex(index){
            this.carDelShow = true;
            this.delindex = index;
            console.log(this.delindex)
        },
        updateIndex(index){
            this.carUpdateShow = true;
            this.updateindex = index;
            this.carForm2.busCode=this.carList[index].busCode,
            this.carForm2.mark=this.carList[index].busCode,
            this.carForm2.busLicense=this.carList[index].busLicense,
            this.carForm2.busType=this.carList[index].busType,
            this.carForm2.busStatus=this.carList[index].busStatus,
            this.carForm2.startTime=this.carList[index].startTime
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
            this.$http.post('http://127.0.0.1:8000/add',this.carForm1).then(res=>{
                this.carList = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].startTime = res.data[i].startTime.slice(0,10);
                    this.carList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            },error=>{
                console.log(error);
            });
            this.showCar = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.carList[index].busCode,
                    db:"bus"
                }
            }).then(res => {
                this.carList = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].startTime = res.data[i].startTime.slice(0,10);
                    this.carList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.carDelShow = false;
        },
        update(index){
            console.log(this.carForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.carForm2).then(res => {
                this.carList = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].startTime = res.data[i].startTime.slice(0,10);
                    this.userList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.carUpdateShow = false;
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