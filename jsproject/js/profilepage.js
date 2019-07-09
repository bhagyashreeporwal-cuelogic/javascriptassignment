(function(){
if(sessionStorage.getItem("userId")== null)
{
	alert("Session Expired!!Please Login Again!!");
	window.location.href="../html/loginpage.html";

}
})();


function profileInDisabledMode(){
	disableTextbox();
	var arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userId=sessionStorage.getItem("userId");
	document.getElementById("firstname").value=arrayUserRecord[userId].firstname;
	document.getElementById("lastname").value=arrayUserRecord[userId].lastname;
	document.getElementById("streetname").value=arrayUserRecord[userId].streetname;
	document.getElementById("cityname").value=arrayUserRecord[userId].cityname;
	document.getElementById("statename").value=arrayUserRecord[userId].statename;
	document.getElementById("countryname").value=arrayUserRecord[userId].countryname;
	document.getElementById("pincode").value=arrayUserRecord[userId].pincode;
	document.getElementById("emailid").value=arrayUserRecord[userId].emailid;
	if(arrayUserRecord[userId].gender === "Male")
		 document.getElementById("male").checked=true;
	else if(arrayUserRecord[userId].gender === "Female")
		 document.getElementById("female").checked=true;
	else{
		 document.getElementById("other").checked=true;
	}
	document.getElementById("edituserpic").src=arrayUserRecord[userId].image;
}

function profileinEditmode(){
	document.getElementById("save").style.display="inline-block";
	document.getElementById("edit").style.display="none";
	 var profileFieldArray=document.getElementsByClassName("profilefield");
	 document.getElementById("getnewimage").disabled=false;
	for(let j=0;j<profileFieldArray.length;j++)
	{
		var childElements=profileFieldArray[j].childNodes;
		for(let i=0;i<childElements.length;i++)
		childElements[i].disabled=false;
	}
	document.getElementById("emailid").disabled=true;
}

function saveChangedData(){
	var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
	if((firstName=="")||(lastName=="")){
		document.getElementById("firstname").style.border="2px solid red";
        document.getElementById("lastname").style.border="2px solid red";
       	alert("Please fill out all the mandatory Elements");
		return false;
	}
	else{
		document.getElementById("firstname").style.border="";
        document.getElementById("lastname").style.border="";
		var userId=sessionStorage.getItem("userId");
		var userArrayRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
		var obj=new Object();
		obj.firstname=firstName;
		obj.lastname=lastName;
		obj.gender=document.querySelector('input[name="gender"]:checked').value;
		obj.streetname=document.getElementById("streetname").value;
		obj.cityname=document.getElementById("cityname").value;
		obj.statename=document.getElementById("statename").value;
		obj.countryname= document.getElementById("countryname").value;
		obj.pincode=document.getElementById("pincode").value;
		obj.emailid=userArrayRecord[userId].emailid;
		obj.password=userArrayRecord[userId].password;
		obj.todoArray=userArrayRecord[userId].todoArray;
		obj.image=userArrayRecord[userId].image;
		userArrayRecord[userId]=obj;
		var persondetailsinstring=JSON.stringify(userArrayRecord);
		localStorage.setItem("registeredUserRecord",persondetailsinstring);
		disableTextbox();
	}
}

function disableTextbox(){
	document.getElementById("edit").style.display="inline-block";
	document.getElementById("save").style.display="none";
	document.getElementById("getnewimage").disabled=true;
    var profileFieldArray=document.getElementsByClassName("profilefield");
	for(let j=0;j<profileFieldArray.length;j++){
		var childElements=profileFieldArray[j].childNodes;
		for(let i=0;i<childElements.length;i++)
		childElements[i].disabled=true;
	}
}

function editImage(){
    var Image =document.getElementById("getnewimage").files[0];
	getimgbase64(Image);
    function getimgbase64(Image){
    	var reader = new FileReader();
    	reader.readAsDataURL(Image);
    	reader.onload = function () {
    		var imgdata = reader.result;
    		sessionStorage.setItem("tempimgdata1",imgdata);
			document.getElementById("edituserpic").src=sessionStorage.tempimgdata1;
			var arrayofuserobject=JSON.parse(localStorage.getItem("registeredUserRecord"));
			var userid=sessionStorage.getItem("userId");
			arrayofuserobject[userid].image=sessionStorage.getItem("tempimgdata1");
			var tostring=JSON.stringify(arrayofuserobject);
			localStorage.setItem("registeredUserRecord",tostring);
    	};
    
        reader.onerror = function (error) {
		};
      
	}
}

  

