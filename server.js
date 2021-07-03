//引入express
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const url = require("url");
const bodyParser = require('body-parser');

//创建express对象
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));
app.newDb = {
    db: ""
};
//创建mysql链接对象
const mysql = require('mysql');
//创建连接，链接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ib'
});
//连接mysql
conn.connect((err) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('success');
});
//创建路由规则,查询所有信息
app.get('/getAll-server', (request, response) => {
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(app.newDb.db);
    var db = request.query.db || app.newDb.db;
    //查询所有数据
    console.log(db);
    if (db == "line_station_ref") {
        var lcode = request.query.lcode;
        console.log(lcode)
        var sqlAll = "SELECT * FROM " + db + " where lineCode = " + lcode + " ";
        conn.query(sqlAll, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            } else {
                //设置响应体
                console.log(result)
                response.send(JSON.stringify(result));
            }
        });
    } else {
        var sqlAll = "SELECT * FROM " + db;
        conn.query(sqlAll, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
            } else {
                //设置响应体
                response.send(JSON.stringify(result));
            }
        });
    }
});
// 删除
app.get('/deleteI', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    var code = request.query.code;
    var db = request.query.db;
    switch (db) {
        case "sysuser":
            var sqlDelete = "DELETE FROM " + db + " WHERE code = '";
            break;
        case "station":
            var sqlDelete = "DELETE FROM " + db + " WHERE stationCode = '";
            break;
        case "line":
            var lcode = request.query.code;
            conn.query("DELETE FROM line_station_ref WHERE lineCode = '" + code + "'", function(err, res) {
                if (err) {
                    console.log("删除失败" + err);
                } else {
                    console.log(code + "关系记录删除成功!");
                }
            });
            var sqlDelete = "DELETE FROM " + db + " WHERE lineCode = '";
            break;
        case "bus":
            var sqlDelete = "DELETE FROM " + db + " WHERE busCode = '";
            break;
        case "permission":
            var sqlDelete = "DELETE FROM " + db + " WHERE permissionCode = '";
            break;
        case "role":
            var sqlDelete = "DELETE FROM " + db + " WHERE roleCode = '";
            break;
    }
    conn.query(sqlDelete + code + "'", function(err, res) {
        if (err) {
            console.log("删除失败" + err);
        } else {
            console.log(code + "删除成功!");
        }
    });
    app.newDb.db = db;
    response.redirect('/getAll-server');
});
//添加
app.post('/add', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    var db = req.body.db;
    switch (db) {
        case "sysuser":
            console.log("sysuser");
            var {
                code: code,
                loginName: loginName,
                password: password,
                name: name,
                id: idCard,
                role: role,
                status: status,
                dage: driving,
                phone: phone,
                db: db
            } = req.body;
            var sqlAdd = "insert into " + db + "(code,loginName,password,name,phone,idCard,role,status,driving) values('";
            conn.query(sqlAdd + code + "','" + loginName + "','" + password + "','" + name + "','" + phone + "','" + idCard + "','" + role + "','" + status + "','" + driving + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "bus":
            console.log("bus");
            var { busCode: busCode, busLicense: busLicense, busType: busType, busStatus: busStatus, startTime: startTime, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(busCode,busLicense,busType,busStatus,startTime) values('";
            conn.query(sqlAdd + busCode + "','" + busLicense + "','" + busType + "','" + busStatus + "','" + startTime + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "station":
            console.log("station");
            var { stationCode: stationCode, stationName: stationName, longitude: longitude, latitude: latitude, region: region, street: street, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(stationCode,stationName,longitude,latitude,region,street) values('";
            conn.query(sqlAdd + stationCode + "','" + stationName + "','" + longitude + "','" + latitude + "','" + region + "','" + street + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "scheduling":
            console.log("scheduling");
            var { code: code, lineCode: lineCode, tcNumber: tcNumber, tcTime: tcTime, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(code,lineCode,tcNumber,tcTime) values('";
            conn.query(sqlAdd + code + "','" + lineCode + "','" + tcNumber + "','" + tcTime + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "line":
            console.log("line");
            var { lineCode: lineCode, lineName: lineName, status: status, startLineTime: startLineTime, direction: direction, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(lineCode,lineName,status,startLineTime,direction) values('";
            conn.query(sqlAdd + lineCode + "','" + lineName + "','" + status + "','" + startLineTime + "','" + direction + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "role":
            console.log("role");
            var { roleCode: roleCode, roleName: roleName, roledescribe: roledescribe, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(roleCode,roleName,roledescribe) values('";
            conn.query(sqlAdd + roleCode + "','" + roleName + "','" + roledescribe + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
        case "permission":
            console.log("permission");
            var { permissionCode: permissionCode, permissionName: permissionName, permissionDescribe: permissionDescribe, db: db } = req.body;
            var sqlAdd = "insert into " + db + "(permissionCode,permissionName,permissionDescribe) values('";
            conn.query(sqlAdd + permissionCode + "','" + permissionName + "','" + permissionDescribe + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
            break;
    }
    app.newDb.db = db;
    res.redirect('/getAll-server');
});
//站点-线路关系添加
app.post('/addsTol', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        var sCode = req.body.s;
        var lcode = req.body.lcode;
        var sqlAdd = "insert into line_station_ref (lineCode,stationCode,stationOrder) values('";
        for (let i = 0; i < sCode.length; i++) {
            conn.query(sqlAdd + lcode + "','" + sCode[i].stationCode + "','" + i + "')", function(err, res) {
                if (err) {
                    console.log("添加失败" + err);
                } else {
                    console.log("添加成功");
                }
            });
        }

    })
    //修改
app.post('/update', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    var db = req.body.db;
    switch (db) {
        case "sysuser":
            console.log(req.body);
            var { code: code, loginName: loginName, phone: phone, name: name, mark: mark } = req.body;
            console.log(code, loginName)
            var sqlUpdate = "update " + db + " set code = '" + code + "',loginName = '" + loginName + "',phone = '" + phone + "',name = '" + name + "' where code = '" + mark + "'";
            console.log(sqlUpdate);
            break;
        case "station":
            console.log(req.body);
            var {
                stationCode: stationCode,
                stationName: stationName,
                longitude: longitude,
                latitude: latitude,
                region: region,
                street: street,
                mark: mark
            } = req.body;
            var sqlUpdate = "update " + db + " set stationCode = '" + stationCode + "',stationName = '" + stationName + "',longitude = '" + longitude + "',latitude = '" + latitude + "',region = '" + region + "',street = '" + street + "' where stationCode = '" + mark + "'";

            break;
        case "line":
            console.log(req.body);
            var {
                lineCode: lineCode,
                lineName: lineName,
                startLineTime: startLineTime,
                status: status,
                direction: direction,
                mark: mark
            } = req.body;
            var sqlUpdate = "update " + db + " set lineCode = '" + lineCode + "',lineName = '" + lineName + "',startLineTime = '" + startLineTime + "',status = '" + status + "',direction = '" + direction + "' where lineCode = '" + mark + "'";
            break;
        case "bus":
            console.log(req.body);
            var {
                busCode: busCode,
                busLicense: busLicense,
                busType: busType,
                busStatus: busStatus,
                startTime: startTime,
                mark: mark
            } = req.body;
            var sqlUpdate = "update " + db + " set busCode = '" + busCode + "',busLicense = '" + busLicense + "',busType = '" + busType + "',busStatus = '" + busStatus + "',startTime = '" + startTime + "' where busCode = '" + mark + "'";
            break;
        case "permission":
            console.log(req.body);
            var {
                permissionCode: permissionCode,
                permissionName: permissionName,
                permissionDescribe: permissionDescribe,
                mark: mark
            } = req.body;
            var sqlUpdate = "update " + db + " set permissionCode = '" + permissionCode + "',permissionName = '" + permissionName + "',permissionDescribe = '" + permissionDescribe + "' where permissionCode = '" + mark + "'";
            break;
        case "role":
            console.log(req.body);
            var {
                roleCode: roleCode,
                roleName: roleName,
                roledescribe: roledescribe,
                mark: mark
            } = req.body;
            var sqlUpdate = "update " + db + " set roleCode = '" + roleCode + "',roleName = '" + roleName + "',roledescribe = '" + roledescribe + "' where roleCode = '" + mark + "'";
            break;
    }
    conn.query(sqlUpdate, function(err, res) {
        if (err) {
            console.log("修改失败" + err);
        } else {
            console.log("修改成功");
            console.log(res);
        }
    });
    app.newDb.db = db;
    res.redirect('/getAll-server');
});
//修改密码
app.post('/updatePSW', (req, res) => {
        var { code: code, psw: psw } = req.body;
        var sql = "update sysuser set password ='" + psw + "' where code = '" + code + "'";
        conn.query(sql, function(err, result) {
            if (err) {
                console.log("修改失败" + err);
            } else {
                console.log("修改成功");
                console.log(result);
                res.send(result);
            }
        });
    })
    //登陆
app.post('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    var { loginName: name, psw: psw } = req.body;
    var sql = "SELECT * FROM sysuser where loginName = '" + name + "'";
    conn.query(sql, (err, result) => {
        if (err) {
            console.log("失败" + err);
        } else {
            if (result.length == 0) {
                res.statusCode = 204;
                res.send(result);
            } else {
                conn.query("SELECT * FROM sysuser where password = '" + psw + "'", (err, result) => {
                    if (err) {
                        console.log("失败" + err);
                    } else {
                        if (result.length == 0) {
                            res.statusCode = 205;
                            res.send(result);
                        } else {
                            res.send(result);
                        }
                    }
                })
            }

        }
    })
})

//关闭对象，end相当于flush，destroy是强制退出。
// conn.end(err => {
//     console.log(err);
// });
// conn.destroy()

//4、监听端口启动服务
app.listen(8000, () => {
    console.log("服务端已启动，8000端口监听中.....");
});