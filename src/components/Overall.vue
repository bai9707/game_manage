<script>
  export default {
    name:'Overall',
    title:"小游戏管理后台",
    Login_user:"",
    link:"http://www.lueluelue.com/",
    json_str(data){
      return JSON.stringify(data)
    },
    al(content){
      alert(content)
    },
    ajax(that,url,data,fn){
      var now=this;
      url=this.link+url;
      if(!data.up){
        data=this.json_str(data);
      }else{
        delete data.up
        var file=new FormData();
        file.append("file",data[0]);
        data=file;
      }
      that.$http.post(url,data,{emulateJSON:false}).then(function(res){
        fn.success?fn.success(res):"";
      },function(err){
        fn.error?fn.error(err):now.al("服务器链接失败...");
      })
    },
    screen(data){
      var data_={};
      for(var i in data){
        if(data[i]!==""){
          data_[i]=data[i]
        }
      }
      return data_;
    },
    checked(type,data,index){
      var td=data.table_body
      if(type=="base"){
        for(var i in td){
          td[i].checked=false;
        }
      }else if(type){
        for(var i in td){
          td[i].checked=data.th_check==true?false:true;
        }
      }else if(!type){
        data.th_check=false;
        data.table_body[index].checked=data.table_body[index].checked==false?true:false;
      }
    },
    select(that,page){
      if(page.value){
        that.select_data=page.value;
        page=page.type;
      }
      var now=this,url=that.port+(that.port=="box/"?"search":"select");
      if(that.select_data.currentpage>=1&&that.select_data.currentpage<=that.pagecount){
        if(page=="+"&&that.select_data.currentpage<that.pagecount){
          that.select_data.currentpage+=1;
        }else if(page=="-"&&that.select_data.currentpage>1){
          that.select_data.currentpage-=1;
        }else if(page=="="&&that.select_data.currentpage>=1&&that.select_data.currentpage<=that.pagecount){
        }else if(page=="change"){
          that.select_data.currentpage=1;
        }else{
          return this.al("跳转页面不存在");
        }
      }else{
        return this.al("跳转页面不存在");
      };
      this.ajax(that,url,this.screen(that.select_data),{
        success(res){
          var data=res.body;
          if(data.code==100){
            that.table_body=data.data.assets;
            now.checked("base",that);
            that.pagecount=data.data.pagecount||1;
          }else{
            now.al("发生未知错误");
          }
        }
      });
    },
    set_box(that,data){
      that[data]=that[data]=="none"?"block":"none"
    },
    choose(that){
      var data={id:[],status:that.set_state},now=this;
      for(var i in that.table_body){
        if(that.table_body[i].checked){
          data.id.push(that.table_body[i].id);
        }
      };
      if(data.id.length==0){
        return alert("未勾选操作数据");
      }
      this.ajax(that,that.port+"changestatus",data,{
        success(res){
          var data=res.body;
          if(data.code==100){
            now.al(data.data);
            that.th_check=false;
            that.status_box="none";
            window.location.reload();
          }else{
            now.al("发生未知错误");
          }
        }
      });
    },
    operation_(that,index,opera){
      var now=this;
      if(typeof index=="number"&&opera=="delete"&&confirm("是否删除?")){
        this.ajax(that,that.port+"delete",{id:parseInt(that.table_body[index].id)},{
          success(res){
            var data=res.body;
            if(data.code==100){
              now.al(data.data);
              window.location.reload();
            }
          }
        });
      }else if(opera=="new"||opera=="info"){
        window.sessionStorage.setItem("type",opera);
        window.sessionStorage.setItem("id",typeof index=="number"?that.table_body[index].id:null);
        that.$emit("monitor",{link:that.port=="box/"?"/GameSettings":"/ClientSettings"});
      }
    },
    skip_href(that,router){
      if(router==-1){
        that.$router.go(-1);
      }else{
        that.$emit("monitor",{link:router});
      }
    },
    update(that,e,index){
      var now=this;
      if(e&&e.target.files.length!=0){
        var file=e.target.files,url;
        file.up=true;
        url=that.activity_list?that.port+"insert":"file/upload/pdffile";
        this.ajax(that,url,file,{
          success(res){
            var data=res.body;
            if(data.code==100){
              if(that.port=="box/"){
                that.boxImgList[index].imageurl=data.data;
              }else if(that.port=="minigame/"){
                that.$forceUpdate();
                that.boxData.minigameLogourl=data.data;
              }else if(url.indexOf("insert")!=-1){
                now.al(data.data);
                setTimeout(()=>{now.select(that,"change")},500); 
              }
            }else{
              now.al("发生未知错误");
            }
          }
        });
      }
    },
    new_admin(that,entrance){
      var now=this,data=that.boxData,url=entrance=="new"?that.port+"insert":that.port+"update";
      if(that.port=="box/"){
        if(that.boxImgList.length==0){
          return alert("请添加分享卡片");
        }
        for(var i in that.boxData){
          if(!that.boxData[i]){
            return alert("请输入必填内容");
          }
        }
        for(var i in that.boxImgList){
          if(that.boxImgList[i].description==""||!that.boxImgList[i].imageurl){
            return alert("请上传图片或补充描述语");
          };
        }
        data.boxImgList=that.boxImgList;
      }else if(that.port=="minigame/"){
        for(var i in that.boxData){
          if(!that.boxData[i]&&i!="minigameExtradata"){
            return now.al("必填项不能为空");
          }
        }
      }
      data.id=that.status.id;
      this.ajax(that,url,data,{
        success(res){
          var data=res.body;
          if(data.code==100){
            alert(data.data);
            window.location.reload();
          }else{
            now.al("发生未知错误");
          }
        }
      });
    },
    info(that,type){
      if(type&&that.btn=="新增"){
        this.new_admin(that,"new");
      }else if(type&&that.btn=="修改"){
        that.btn="保存";
        that.disabled=false;
      }else if(type&&that.btn=="保存"){
        this.new_admin(that,"admin");
      }else if(!type){
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("type");
        this.skip_href(that,-1);
      }
    },
    info_if(that){
      if(that.status.type!="new"&&(that.status.type!="info"||that.status.id==null)){
        this.al("操作异常...");
        this.skip_href(that,"/");
        window.location.reload();
      }
      if(that.status.type=="info"&&that.status.id!=null){
        var now=this;
        that.btn="修改";
        that.disabled_=true;
        that.disabled=true;
        this.ajax(that,that.port+"details",{id:that.status.id},{
          success(res){
            var data=res.body;
            if(data.code==100){
              if(that.port=="box/"){
                for(var i=0;i<data.data.details.boxImgList.length;i++){
                  that.boxImgList[i]={};
                  that.boxImgList[i].id=data.data.details.boxImgList[i].id
                  that.boxImgList[i].imageurl=data.data.details.boxImgList[i].imageurl
                  that.boxImgList[i].description=data.data.details.boxImgList[i].description
                }
                for(var i in that.boxData){
                  that.boxData[i]=data.data.details[i];
                }
              }else if(that.port=="minigame/"){
                for(var i in that.boxData){
                  that.boxData[i]=data.data.minigame[i];
                }
                that.boxData.minigameExtradata=data.data.minigame.minigameExtradata;
              }
            }else{
              now.al("发生未知错误");
            }
          }
        });
      }
    },
    boxname_(that,type){
      var now=this;
      this.ajax(that,that.port+"boxname","",{
        success(res){
          var data=res.body;
          if(data.code==100){
            that.boxname=data.data.name;
            if(type){
              that.boxData.boxName=data.data.name[0];
            }
          }else{
            now.al("发生未知错误");
          }
        }
      });
    },
    activity(that,index){
      that.table_head=that.activity_list[index||0].head;
      that.port=that.activity_list[index||0].port;
      that.body_para=that.activity_list[index||0].body;
    }
  }
</script>