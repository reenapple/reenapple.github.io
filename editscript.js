/*source: https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2*/
function back2W(){
    $('html, body').animate({
        scrollTop: $("#work").offset().top
    }, 0);
}
function back2Edu(){
    $('html, body').animate({
        scrollTop: $("#education").offset().top
    }, 0);
}
function back2Org(){
    $('html, body').animate({
        scrollTop: $("#organization").offset().top
    }, 0);
}
function back2AboutMe(){
    $('html, body').animate({
        scrollTop: $("#about-me").offset().top
    }, 0);
}


function displayDelW(){
    var db = firebase.firestore();
    $("div.delete-w-content").empty();
    
    db.collection("works").orderBy("year_created").get().then(function(snapshot) {
        snapshot.forEach(function(doc){
            var wArticle = document.createElement("article");
            var wPhoto = document.createElement("img");

            var wName = document.createElement("div");
            var wYearCreated = document.createElement("div");
            var wLanguage = document.createElement("div");
            var wDesc = document.createElement("div");

            $(wPhoto).attr("src", doc.data().img_url);
            $(wName).text(doc.data().name);
            $(wYearCreated).text(doc.data().year_created);
            $(wLanguage).text(doc.data().language);
            $(wDesc).text(doc.data().desc);

            $(wArticle).addClass("del-w")
            $(wArticle).attr("w-name", doc.data().name+"-"+doc.data().year_created);
            $(wArticle).attr("w-uid", doc.id);
            $(wPhoto).addClass("del-w-photo")
            $(wName).addClass("del-w-name")
            $(wYearCreated).addClass("del-w-year-created")
            $(wLanguage).addClass("del-w-language")
            $(wDesc).addClass("del-w-desc")
            
            $(wArticle).append(wName);
            $(wArticle).append(wYearCreated);
            $(wArticle).append(wLanguage);
            $(wArticle).append(wPhoto);
            $(wArticle).append(wDesc);

            $("div.delete-w-content").append(wArticle);
        });
    });
};

function displayDelEdu(){
    var db = firebase.firestore();

    $("div.delete-edu-content").empty();

    db.collection("educations").orderBy("year_start").get().then(function(snapshot) {
        snapshot.forEach(function(doc){
            var eduArticle = document.createElement("article");

            var eduDegree = document.createElement("div");
            var eduSchool = document.createElement("div");
            var eduYears = document.createElement("div");
            var eduType = document.createElement("div");

            $(eduDegree).text(doc.data().degree);
            $(eduSchool).text(doc.data().school);
            $(eduYears).text(doc.data().year_start+"-"+doc.data().year_end);
            $(eduType).text("("+doc.data().type+")");

            $(eduArticle).addClass("del-edu")
            $(eduArticle).attr('edu-name', doc.data().school+"-"+doc.data().year_start+"-"+doc.data().year_end);
            $(eduArticle).attr('edu-uid', doc.id);
            $(eduDegree).addClass("del-edu-degree")
            $(eduSchool).addClass("del-edu-school")
            $(eduYears).addClass("del-edu-years")
            $(eduType).addClass("del-edu-type")

            $(eduArticle).append(eduSchool);
            $(eduArticle).append(eduYears);
            $(eduArticle).append(eduDegree);
            $(eduArticle).append(eduType);

            $("div.delete-edu-content").append(eduArticle);
        })
    });
};

function displayDelOrg(){
    var db = firebase.firestore();
    $("div.delete-org-content").empty();
    db.collection("organizations").orderBy("year_start").get().then(function(snapshot) {
        snapshot.forEach(function(doc){
            var orgArticle = document.createElement("article");

            var orgName = document.createElement("div");
            var orgPosition = document.createElement("div");
            var orgYear = document.createElement("div");

            $(orgName).text(doc.data().name);
            $(orgPosition).text(doc.data().position);
            $(orgYear).text(doc.data().year_start+"-"+doc.data().year_end);

            $(orgArticle).addClass("del-org")
            $(orgArticle).attr("org-name", doc.data().name+"-"+doc.data().year_start+"-"+doc.data().year_end);
            $(orgArticle).attr("org-uid", doc.id);
            $(orgName).addClass("del-org-name")
            $(orgPosition).addClass("del-org-position")
            $(orgYear).addClass("del-org-year")

            $(orgArticle).append(orgName);
            $(orgArticle).append(orgPosition);
            $(orgArticle).append(orgYear);

            $("div.delete-org-content").append(orgArticle);
        })
    });
    
};

function displayDelOthers(){
    var db = firebase.firestore();
    db.collection("others").get().then(function(snapshot) {
        snapshot.forEach(function(doc){

            $("#edit-about-me").attr("placeholder", doc.data().desc);
            $("#edit-github").attr("placeholder", doc.data().github);
            $("#edit-twitter").attr("placeholder", doc.data().twitter);
            $("#edit-linkedin").attr("placeholder", doc.data().linkedin);

        })
    });
}



$(document).ready(function(){

    $(".display").hide();
    
    $(".popupadd-w").hide();
    $(".popupadd-edu").hide();
    $(".popupadd-org").hide();

    $(".popupdelete-w").hide();
    $(".popupdelete-edu").hide();
    $(".popupdelete-org").hide();

    $(".popupedit-others").hide();



    $("#loginsubmit").click(function(){
        if($("#email").val() == "" || $("#password").val() == ""){
            alert("please input email and password")
        }
        else{
            var email = $("#email").val();
            var password = $("#password").val();
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
                if (user!=null){
                    $(".popuplogin").hide();
                    $(".display").fadeToggle(500);
                    showdbcontent();
                }
            }).catch(function(err){
                if(err.code == "auth/wrong-password" || err.code == "auth/invalid-email"){
                    alert("wrong email or password")
                }else{
                    alert(err.message);
                }
            });
        }
    });



    $("#add-w").click(function(){
        $(".display").hide();
        $(".popupadd-w").fadeToggle(500);
    });
    
    $("#add-w-cancel").click(function(){
        $(".popupadd-w").hide();
        $(".display").fadeToggle(500);
        back2W();
    })

    $("#add-w-submit").click(function(){
        if($("#w-name").val() == ""
            || $("#w-year-created").val() == ""
            || $("#w-language").val() == ""
            || $("#w-desc").val() == ""){
            alert("please input complete details")
        }
        else{
            if($("#w-photo").val() == ""){
                var newObject = {
                    name: $("#w-name").val(),
                    year_created: parseInt($("#w-year-created").val()),
                    language: $("#w-language").val(),
                    desc: $("#w-desc").val(),
                    img_url: "https://i.imgur.com/77uOpFs.jpg"
                }
            }else{
                var newObject = {
                    name: $("#w-name").val(),
                    year_created: parseInt($("#w-year-created").val()),
                    language: $("#w-language").val(),
                    desc: $("#w-desc").val(),
                    img_url: $("#w-photo").val()
                }
            }
            
            var db = firebase.firestore();
            db.collection("works").add(newObject).then(function(doc){
            
                $(".popupadd-w").hide();                    
                $(".display").fadeToggle(500);
                showdbcontent();
                    
                $("#w-name").val("");
                $("#w-year-created").val("");
                $("#w-language").val("");
                $("#w-desc").val("");
                $("#w-photo").val("");
                back2W();
            })
        }
    });

    $("#delete-w").click(function(){
        $(".display").hide();
        $(".popupdelete-w").fadeToggle(500);
        displayDelW();
    })
    $("#del-w-back").click(function(){
        $(".popupdelete-w").hide();
        $(".display").fadeToggle(500);
        back2W();
    })

    $(document).on("click", "article.del-w", function(){
        if(confirm("Delete "+ $(this).attr("w-name")+"?")){
            var db = firebase.firestore();
            db.collection("works").doc($(this).attr("w-uid")).delete().then(function(){
                displayDelW();        
                showdbcontent();
            }).catch(function(err){
                alert("Error in deleting item: " + err);
            });
        }else{
            //
        } 
    });


    $("#add-edu").click(function(){
        $(".display").hide();
        $(".popupadd-edu").fadeToggle(500);
    });
    
    $("#add-edu-cancel").click(function(){
        $(".popupadd-edu").hide();
        $(".display").fadeToggle(500);
        back2Edu();
    })

    $("#add-edu-submit").click(function(){
        if($("#edu-school").val() == ""
            || $("#edu-type").val() == ""
            || $("#edu-year-start").val() == ""
            || $("#edu-year-end").val() == ""){
                alert("please input complete details")
        }
        else{
            if($("#edu-degree").val() == ""){
                var newObject = {
                    school: $("#edu-school").val(),
                    type: $("#edu-type").val(),
                    year_start: parseInt($("#edu-year-start").val()),
                    year_end: parseInt($("#edu-year-end").val())
                }
            }else{
                var newObject = {
                    degree: $("#edu-degree").val(),
                    school: $("#edu-school").val(),
                    type: $("#edu-type").val(),
                    year_start: parseInt($("#edu-year-start").val()),
                    year_end: parseInt($("#edu-year-end").val())
                }
            }
            
            var db = firebase.firestore();
            db.collection("educations").add(newObject).then(function(doc){
            
                $(".popupadd-edu").hide();                    
                $(".display").fadeToggle(500);
                showdbcontent();
                    
                $("#edu-degree").val("");
                $("#edu-school").val("");
                $("#edu-type").val("");
                $("#edu-year-start").val("");
                $("#edu-year-end").val("");
                back2Edu();
            })
        }
    });

    $("#delete-edu").click(function(){
        $(".display").hide();
        $(".popupdelete-edu").fadeToggle(500);
        displayDelEdu();
    })
    $("#del-edu-back").click(function(){
        $(".popupdelete-edu").hide();
        $(".display").fadeToggle(500);
        back2Edu();
    })

    $(document).on("click", "article.del-edu", function(){
        if(confirm("Delete "+ $(this).attr("edu-name")+"?")){
            var db = firebase.firestore();
            db.collection("educations").doc($(this).attr("edu-uid")).delete().then(function(){
                displayDelEdu();
                showdbcontent();
            }).catch(function(err){
                alert("Error in deleting item: " + err);
            });
        }else{
            //
        } 
    });


    $("#add-org").click(function(){
        $(".display").hide();
        $(".popupadd-org").fadeToggle(500);
    });
    
    $("#add-org-cancel").click(function(){
        $(".popupadd-org").hide();
        $(".display").fadeToggle(500);
        back2Org();
    })

    $("#add-org-submit").click(function(){
        if($("#org-name").val() == ""
            || $("#org-position").val() == ""
            || $("#org-year-start").val() == ""
            || $("#org-year-end").val() == ""){
                alert("please input complete details")
        }
        else{
            var newObject = {
                name: $("#org-name").val(),
                position: $("#org-position").val(),
                year_start: parseInt($("#org-year-start").val()),
                year_end: parseInt($("#org-year-end").val())
            }
            
            var db = firebase.firestore();
            db.collection("organizations").add(newObject).then(function(doc){
            
                $(".popupadd-org").hide();                    
                $(".display").fadeToggle(500);
                showdbcontent();
                    
                $("#org-name").val("");
                $("#org-position").val("");
                $("#org-year-start").val("");
                $("#org-year-end").val("");
                back2Org();
            })
        }
    });

    $("#delete-org").click(function(){
        $(".display").hide();
        $(".popupdelete-org").fadeToggle(500);
        displayDelOrg();
    })
    $("#del-org-back").click(function(){
        $(".popupdelete-org").hide();
        $(".display").fadeToggle(500);
        back2Org();
    })

    $(document).on("click", "article.del-org", function(){
        if(confirm("Delete "+ $(this).attr("org-name")+"?")){
            var db = firebase.firestore();
            db.collection("organizations").doc($(this).attr("org-uid")).delete().then(function(){
                displayDelOrg();
                showdbcontent();
            }).catch(function(err){
                alert("Error in deleting item: " + err);
            });
        }else{
            //
        } 
    });

    $("#edit-others").click(function(){
        $(".display").hide();
        $(".popupedit-others").fadeToggle(500);
        displayDelOthers();
    });

    $("#edit-others-cancel").click(function(){
        $(".popupedit-others").hide();
        $(".display").fadeToggle(500);
        back2AboutMe();
    });

    $("#edit-others-submit").click(function(){
        var db = firebase.firestore();
        if($("#edit-about-me").val() == ""
            && $("#edit-github").val() == ""
            && $("#edit-twitter").val() == ""
            && $("#edit-linkedin").val() == ""){
                alert("please input details for any of the following")
        }
        else{
            //source: https://firebase.google.com/docs/firestore/manage-data/delete-data#fields        
            if($("#edit-about-me").val() != ""){
                db.collection("others").doc("about").update({
                    desc: firebase.firestore.FieldValue.delete(),
                    desc: $("#edit-about-me").val()
                });
            }if($("#edit-github").val() != ""){
                db.collection("others").doc("links").update({
                    github: firebase.firestore.FieldValue.delete(),
                    github: $("#edit-github").val()
                });
            }if($("#edit-twitter").val() != ""){
                db.collection("others").doc("links").update({
                    twitter: firebase.firestore.FieldValue.delete(),
                    twitter: $("#edit-twitter").val()
                });
            }if($("#edit-linkedin").val() != ""){
                db.collection("others").doc("links").update({
                    linkedin: firebase.firestore.FieldValue.delete(),
                    linkedin: $("#edit-linkedin").val()
                });
            }

            $(".popupedit-others").hide();
            $(".display").fadeToggle(500);
            showdbcontent();
    
            $("#edit-about-me").val("");
            $("#edit-github").val("");
            $("#edit-twitter").val("");
            $("#edit-linkedin").val("");
            
            back2AboutMe();
        }       
    });
});