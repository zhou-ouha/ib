<template>
    <div id="user">
        <h1>线路信息<el-button type="primary" icon="el-icon-edit" 
        circle size="small" style="margin-left:10px;" title="添加线路"
        @click="showLine = true"></el-button></h1>
            <el-dialog title="添加线路" :visible.sync="showLine">
                <el-form :model="lineForm1">
                    <el-form-item label="线路编码" :label-width="formLabelWidth">
                        <el-input v-model="lineForm1.lineCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="线路名称" :label-width="formLabelWidth">
                        <el-input v-model="lineForm1.lineName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="lineForm1.status" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="开线时间" :label-width="formLabelWidth">
                        <el-input v-model="lineForm1.startLineTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="运行方向" :label-width="formLabelWidth">
                        <el-input v-model="lineForm1.direction" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="添加站点" :label-width="formLabelWidth">
                        <el-button @click="showStation = true;" type="primary">站点信息</el-button>
                        <el-dialog
                        width="70%"
                        title="已经启用的站点信息"
                        :visible.sync="showStation"
                        append-to-body>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
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
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showStation = false">取 消</el-button>
                            <el-button type="primary" @click="showStation = false;addsTol();">确 定</el-button>
                        </div>
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showLine = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        <div class="body">
            <el-table
            :data="lineList"
            stripe
            style="width: 100%">
            <el-table-column
            prop="lineCode"
            label="线路编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="lineName"
            label="线路名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="startLineTime"
            width="180"
            label="开线时间">
            </el-table-column>
            <el-table-column
            prop="status"
            width="180"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="direction"
            width="180"
            label="运行方向">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="240">
            <template slot-scope="scope">
                <el-button @click="drawer = true;getLine(scope.$index);" type="primary" size="small">查看</el-button>
                <el-drawer
                :modal="false"
                size="30%"
                title="路线详情"
                :visible.sync="drawer"
                direction="ltr">
                <!-- 这里是线路的详细信息 -->
                <template>
                    <el-timeline>
                        <el-timeline-item
                        v-for="(item, index) in stationShowList"
                        :key="index"
                        :timestamp="stationShowList.stationCode">
                        
                        {{item.stationName}}
                        
                        </el-timeline-item>
                    </el-timeline>
                </template>
                </el-drawer>
                <el-button @click="updateIndex(scope.$index)" type="success" size="small" style="margin-left:5px">修改</el-button>
                <el-dialog title="站点信息" :visible.sync="lineUpdateShow" :modal="false">
                    <el-form :model="lineForm2">
                        <el-form-item label="线路编码" :label-width="formLabelWidth">
                        <el-input v-model="lineForm2.lineCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="线路名称" :label-width="formLabelWidth">
                        <el-input v-model="lineForm2.lineName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="开线时间" :label-width="formLabelWidth">
                        <el-input v-model="lineForm2.startLineTime" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="状态" :label-width="formLabelWidth">
                        <el-input v-model="lineForm2.status" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="运行方向" :label-width="formLabelWidth">
                        <el-input v-model="lineForm2.direction" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="lineUpdateShow = false">取 消</el-button>
                        <el-button type="primary" @click="update(updateindex)">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button @click="delIndex(scope.$index)" 
                type="danger" size="small" style="margin-left:5px;">删除</el-button>
                <el-dialog
                        title="提示"
                        :visible.sync="lineDelShow"
                        width="30%"
                        :modal="false">
                        <span>您确定要删除吗？该操作将永久删除该条数据！</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="lineDelShow = false">取 消</el-button>
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
            lineList:[],//线路信息表
            stationShowList:[],//线路中的站点信息
            showLine:false,//控制添加项的展示与隐藏
            showStation:false,//控制添加项的展示与隐藏
            lineDelShow:false,//控制删除界面展开与隐藏
            lineUpdateShow:false,//控制修改界面展开与隐藏
            stationShow:false,//内层站点信息的展示与隐藏
            delindex:'',//删除的数据处于第几行
            updateindex:'',//修改的数据处于第几行
            multipleSelection: [],//多选的内容
            drawer:false,
            stationDetail:[],
            addsl:{
                s:'',
                lcode:''
            },
            tableData:[],//站点信息
            //添加信息表内容
            lineForm1:{
                lineCode:'',
                lineName:'',
                status:'',
                startLineTime:'',
                direction:'',
                db:'line'
            },
            //修改信息表内容
            lineForm2:{
                lineCode:'',
                lineName:'',
                status:'',
                startLineTime:'',
                direction:'',
                mark:'',
                db:'line'
            },
            formLabelWidth: '120px',
        }
    },
    mounted(){
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"line"
            }
        }).then(res=>{
                console.log(res);
                for(let i = 0;i < res.data.length;i ++){
                    res.data[i].startLineTime = res.data[i].startLineTime.slice(0,10)
                    if(res.data[i].status == 0){
                        res.data[i].status = "禁用";
                    }else if(res.data[i].status == 1){
                        res.data[i].status = "启用";
                    }
                    if(res.data[i].direction == "1"){
                        res.data[i].direction = "上行";
                    }else if(res.data[i].direction == "0"){
                        res.data[i].direction = "下行";
                    }
                    this.lineList.splice(i, 1, res.data[i]);
                }
            }
        )
        this.$http.get('http://127.0.0.1:8000/getAll-server',{
            params:{
                db:"station"
            }
        }).then(res=>{
                console.log(res);
                this.tableData = res.data;
            }
        )
    },
    methods:{
        getLine(index){
            console.log(this.tableData)
            console.log(this.lineList[index])
            this.$http.get("http://127.0.0.1:8000/getAll-server",{
            params:{
                db:"line_station_ref",
                lcode:this.lineList[index].lineCode,
            }
            }).then(res =>{
                    console.log(res.data);
                    this.stationDetail = res.data;
                    if(res.data.length == 0){
                        this.stationShowList = [{stationName:"还没添加站点"}];
                    }else{
                        for(let i = 0;i < res.data.length;i ++){
                            for(let j = 0;j < this.tableData.length;j ++){
                                if(this.tableData[j].stationCode == res.data[i].stationCode){
                                    this.stationShowList.splice(i,1,this.tableData[j]);
                            }
                        }
                    }
                    }
                    console.log(this.stationShowList)
                })
            },
        addsTol(){
            //将站点和线路的编号组合发送到站点线路关系表
            this.addsl.s = this.multipleSelection;
            this.addsl.lcode = this.lineForm1.lineCode;
            console.log(this.addsl);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delIndex(index){
            this.lineDelShow = true;
            this.delindex = index;
        },
        updateIndex(index){
            this.lineUpdateShow = true;
            this.updateindex = index;
            this.lineForm2.lineCode=this.lineList[index].lineCode
            this.lineForm2.lineName=this.lineList[index].lineName
            this.lineForm2.startLineTime=this.lineList[index].startLineTime
            this.lineForm2.status=this.lineList[index].status
            this.lineForm2.direction=this.lineList[index].direction
            this.lineForm2.mark=this.lineList[index].lineCode
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        add(){
            console.log(this.lineForm1);
            this.$http.post('http://127.0.0.1:8000/add',this.lineForm1).then(res=>{
                this.lineList = [];
                for(let i = 0;i < res.data.length;i ++){
                    res.data[i].startLineTime = res.data[i].startLineTime.slice(0,10)
                    if(res.data[i].status == 0){
                        res.data[i].status = "禁用";
                    }else if(res.data[i].status == 1){
                        res.data[i].status = "启用";
                    }
                    if(res.data[i].direction == "1"){
                        res.data[i].direction = "上行";
                    }else if(res.data[i].direction == "0"){
                        res.data[i].direction = "下行";
                    }
                    this.lineList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
                this.$http.post('http://127.0.0.1:8000/addsTol',this.addsl).then(res=>{
                    console.log(res.data);
                })
            },error=>{
                console.log(error);
            });
            this.showLine = false;
        },
        deleteByName(index){
            this.$http.get("http://127.0.0.1:8000/deleteI",{
                params:{
                    code:this.lineList[index].lineCode,
                    db:"line"
                }
            }).then(res => {
                this.lineList = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.lineList.splice(i, 1, res.data[i]);
                }
                console.log(res.data)
            });
            this.lineDelShow = false;
        },
        update(index){
            console.log(this.stationForm2);
            this.$http.post("http://127.0.0.1:8000/update",this.lineForm2).then(res => {
                this.lineList = [];
                for(let i = 0;i < res.data.length;i ++){
                    res.data[i].startLineTime = res.data[i].startLineTime.slice(0,10)
                    if(res.data[i].status == 0){
                        res.data[i].status = "禁用";
                    }else if(res.data[i].status == 1){
                        res.data[i].status = "启用";
                    }
                    if(res.data[i].direction == "1"){
                        res.data[i].direction = "上行";
                    }else if(res.data[i].direction == "0"){
                        res.data[i].direction = "下行";
                    }
                    this.lineList.splice(i, 1, res.data[i]);
                }
                console.log(res.data);
            });
            this.lineUpdateShow = false;
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