function addTodoItems()
{
  
   document.getElementById("MytodopageClass").style.display="none";
var title=document.getElementById("Title").value;
document.getElementById("registeredUserForm").style.display="none";
var categorytype=document.getElementById("categorytype").value;
var startDate=document.getElementById("startDate").value;
var endDate=document.getElementById("endDate").value;
var setReminder=document.getElementById("setReminder").value;
alert(setReminder);
	

var reminderdate=document.getElementById("reminderdate").value;

var makeTodoPublic=document.getElementById("makeTodoPublic").value;
var todoDescription=document.getElementById("todoDescription").value;
var userid=sessionStorage.getItem("userId");
let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
var obj=new Object();
obj.title=title;
obj.categoryType=categorytype;
obj.startDate=startDate;
obj.endDate=endDate;
obj.setReminder=setReminder;
obj.reminderDate=reminderdate;
obj.makeTodoPublic=makeTodoPublic;
obj.todoDescription=todoDescription;
obj.todoStatus="isPending";
arrayUserRecord[userid].todoArray.push(obj);
var stringUserRecord=JSON.stringify(arrayUserRecord);
localStorage.setItem("registeredUserRecord",stringUserRecord);
document.getElementById("MytodopageClass").style.display="block";
document.getElementById("formpage").style.display="none";
window.location.replace("mytodopage.html");

}


function todopageInDisplayMode(inputValue,userid)
{
	var e=document.getElementById("todoCards");
	var child = e.lastElementChild;  
	while (child) { 
		e.removeChild(child); 
		child = e.lastElementChild;
	}
	if(inputValue.length==0)
	{
		var li = document.createElement("noRecordText");
		var content="<h1 style='margin-top:30px;'>No Records found</h1>";
		li.innerHTML=content;
		document.getElementById("todoCards").appendChild(li);
	}
	else
	{
	  for(var count=0;count<inputValue.length;count++)
        {
            var li = document.createElement("div111");
           
        var title = inputValue[count].title;
        var startdate=inputValue[count].startDate;
        var endDate=inputValue[count].endDate;
        var categoryType=inputValue[count].categoryType;
        var divaa='<div class=todoDisplayclass  id=display-'+count+'><input type=checkbox name="deleteDiv" id=checkbox-'+count+'><h1>'+title+'</h1><h3>Category:'+categoryType+'</h3><h3>Start Date'+startdate+'</h3><h3>End Date'+endDate+'</h3><div class="isDoneDiv"><h3>Is Done</h3><input type=checkbox name="isDone" id="isDone"'+count+' onchange="changeStatusOfTodo(this);"></div><input type="button" name="viewFullTodo" value="View Full Todo"></div>';

        li.innerHTML=divaa;
        document.getElementById("todoCards").appendChild(li);
        }   
           
    	var buttonarray=document.getElementsByName("viewFullTodo");
		for(let i=0;i<buttonarray.length;i++)
		{
				document.getElementById("saveEditedTodoItem").disabled=true;
				document.getElementById("editTodoItem").disabled=false;
				buttonarray[i].addEventListener('click',function(){
					disableFields(i)
				});
					
		}	
	}	
			
			
}
function filterTodoFunction()
{
	
	document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block"; 
	document.getElementById("registeredUserForm").style.display="none";
	let filterValue=document.getElementById("filterDropdown").value;
	 let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
	  var userid=sessionStorage.getItem("userId");
	 var inputValue = arrayUserRecord[userid].todoArray;
	 var filteredarray=[];
	 if(filterValue ==="Filter")
	{
		todopageInDisplayMode(inputValue,userid);
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filtercategory").style.display="none";
	}


	 else if(document.getElementById("filterDropdown").value === "byDate")
	{
		
		var filterdate=document.getElementById("filterdate").value;
		var filteredarray=inputValue.filter(function(date1){
		return((new Date(date1.startDate)).getDate() === (new Date(filterdate)).getDate())
		})
		console.log(filteredarray);
		todopageInDisplayMode(filteredarray,userid);
	}
	else if(document.getElementById("filterDropdown").value === "byCategory")
	{
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filtercategory").style.display="inline-block";
		if(document.getElementById("filtercategory").value ==="Category")
		{
			todopageInDisplayMode(inputValue,userid);
		}
		else if(document.getElementById("filtercategory").value ==="Office")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Office")
				})
		}
		else if(document.getElementById("filtercategory").value ==="Home")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Home")
				})
		}
		else if(document.getElementById("filtercategory").value ==="Social")
		{
			var filteredarray=inputValue.filter(function(category1){
				return(category1.categoryType === "Social")
				})
		}
		todopageInDisplayMode(filteredarray,userid);
	}
}
function displaydatetext()
{
	if(document.getElementById("filterDropdown").value === "byDate")
	{
	document.getElementById("filterdate").style.display="inline-block";
	document.getElementById("filtercategory").style.display="none";
	}
	else if(document.getElementById("filterDropdown").value === "byCategory")
	{
		document.getElementById("filterdate").style.display="none";
		document.getElementById("filtercategory").style.display="inline-block";	
	}
	else
	{
		filterTodoFunction();
	}
}	


function disableFields(i){
	sessionStorage.setItem("todoid",i);
	let arrayUserRecord=JSON.parse(localStorage.getItem("registeredUserRecord"));
    var userid=sessionStorage.getItem("userId");
	var todoid=sessionStorage.getItem("todoid");
	  var inputValue = arrayUserRecord[userid].todoArray;
				document.getElementById("formpage").style.display="none";
				document.getElementById("MytodopageClass").style.display="none"; 
				document.getElementById("registeredUserForm").style.display="block";
				document.getElementById("editstartDate").value=inputValue[todoid].startDate;
				document.getElementById("editTitle").value=inputValue[todoid].title;
				var categoryId=document.getElementById("editcategorytype");
				document.getElementById("editcategorytype").disabled=true;
				for(let counter=0;counter<categoryId.options.length;counter++)
				{
							if(categoryId[counter].value === inputValue[todoid].categoryType)
							{
							document.getElementById("editcategorytype").options[counter].selected=true;
							break;
							}
				}
				
				document.getElementById("editendDate").value=inputValue[todoid].endDate;
				document.getElementById("editreminderdate").value=inputValue[todoid].reminderDate;
				
				if(inputValue[todoid].makeTodoPublic === "on")
					document.getElementById("editmakeTodoPublic").checked=true;
				else 
					document.getElementById("editmakeTodoPublic").checked=false;
				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				document.getElementById("editstartDate").disabled=true;
				document.getElementById("editTitle").disabled=true;
				
				document.getElementById("editendDate").disabled=true;
				if(inputValue[todoid].setReminder === "on")
				{
					document.getElementById("editsetReminder").checked=true;
					document.getElementById("editsetReminder").disabled=true;
					document.getElementById("editreminderdate").disabled=true;
				}
				else 
				{
					document.getElementById("editsetReminder").checked=false;
					document.getElementById("editsetReminder").disabled=true;
					document.getElementById("editreminderdate").disabled=true;
				}
			
				document.getElementById("editmakeTodoPublic").disabled=true;
				document.getElementById("edittodoDescription").disabled=true;
					document.getElementById("saveEditedTodoItem").disabled=true;
				document.getElementById("editTodoItem").disabled=false;
			
}

function enabletextbox()
{
	
document.getElementById("reminderdate").disabled=false;
document.getElementById("reminderdate").style.display="block";
document.getElementById("reminderdatelabel").style.display="block";
}
function enableForm()
{
    document.getElementById("formpage").style.display="block";
    document.getElementById("MytodopageClass").style.display="none"; 
	document.getElementById("registeredUserForm").style.display="none";
}
function enableDisplay()
{
    document.getElementById("formpage").style.display="none";
    document.getElementById("MytodopageClass").style.display="block";
	document.getElementById("registeredUserForm").style.display="none";
	window.location.reload();

}
function deletetodos()
{
	var checkedarray=[];
	var arraydelete=document.getElementsByName("deleteDiv");
	userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	
	for(var i=0;i<userRecordArray[userid].todoArray.length;i++)
	{
		if(document.getElementById("checkbox-"+i).checked === true)
		{
		//document.getElementById("todoCards").removeChild("display-"+i);
		checkedarray.push(i);
		}

	}
	for(let count=checkedarray.length-1;count>=0;count--)
	{
		userRecordArray[userid].todoArray.splice(checkedarray[count],1);
	}
var todostringify=JSON.stringify(userRecordArray);
    localStorage.setItem("registeredUserRecord",todostringify);
	window.location.reload();
	
}


function deleteSession()
{
	sessionStorage.removeItem("userId");
	window.location.replace("loginpage.html");
	
}
function editTodoItems(){
				let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
			var inputValue = userRecordArray[userid].todoArray;
				var buttonarray=document.getElementsByName("editTodoItem");
              var todoid=sessionStorage.getItem("todoid");
			var categoryId=document.getElementById("editcategorytype");
				document.getElementById("formpage").style.display="none";
				document.getElementById("MytodopageClass").style.display="none"; 
				document.getElementById("registeredUserForm").style.display="block";
				document.getElementById("editstartDate").value=inputValue[todoid].startDate;
				document.getElementById("editTitle").value=inputValue[todoid].title;
				for(let counter=0;counter<categoryId.options.length;counter++)
				{
							if(categoryId[counter].value==="inputValue[todoid].categoryType")
									document.getElementById("editcategorytype").options.selected=true;
				}
				document.getElementById("editendDate").value=inputValue[todoid].endDate;
				
				document.getElementById("reminderdate").value=inputValue[todoid].reminderDate;
				
				
				document.getElementById("edittodoDescription").value=inputValue[todoid].todoDescription;
				
				document.getElementById("editsetReminder").disabled=false;
				document.getElementById("editstartDate").disabled=false;
				document.getElementById("editTitle").disabled=false;
			document.getElementById("editcategorytype").disabled=false;
				document.getElementById("editendDate").disabled=false;
				document.getElementById("editreminderdate").disabled=false;
			
				document.getElementById("reminderdate").disabled=false;
				document.getElementById("editmakeTodoPublic").disabled=false;
				document.getElementById("edittodoDescription").disabled=false;
				
					document.getElementById("saveEditedTodoItem").disabled=false;
			   document.getElementById("editTodoItem").disabled=true;
			   
	
				
				
				
	}

	
	function saveEditedTodoItem()
	{
		let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
				var todoid=sessionStorage.getItem("todoid");
		var title=document.getElementById("editTitle").value;
	
		var categorytype=document.getElementById("editcategorytype").value;	
		var startDate=document.getElementById("editstartDate").value;	
		var endDate=document.getElementById("editendDate").value;
		var setReminder=document.getElementById("editsetReminder");
		 var reminderdate=document.getElementById("editreminderdate").value;
       var makeTodoPublic=document.getElementById("editmakeTodoPublic").value;
       var todoDescription=document.getElementById("edittodoDescription").value;
			
			
				var obj=new Object();
				
				obj.title=title;
				obj.categoryType=categorytype;
				obj.startDate=startDate;
				obj.endDate=endDate;
				obj.setReminder=setReminder;
				obj.reminderDate=reminderdate;
				obj.makeTodoPublic=makeTodoPublic;
				obj.todoDescription=todoDescription;
				obj.todoStatus=userRecordArray[userid].todoArray.todoStatus;
				userRecordArray[userid].todoArray[todoid]=obj;
				var stringUserRecord=JSON.stringify(userRecordArray);
				localStorage.setItem("registeredUserRecord",stringUserRecord);
				document.getElementById("MytodopageClass").style.display="block";
				document.getElementById("formpage").style.display="none";
				disableFields(todoid);
}

function searchTodoByName()
{
	var arrayValue=[];
	var searchtext=document.getElementById("searchTodo").value;
	
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
	var userid=sessionStorage.getItem("userId");
	var inputValue=userRecordArray[userid].todoArray;
	if(searchtext === ""){
	todopageInDisplayMode(inputValue,userid);}
	else{

	for(var i=0;i<inputValue.length;i++)
	{
	if(searchtext.toUpperCase() === inputValue[i].title.toUpperCase()){
	arrayValue.push(inputValue[i]);}
	}
	todopageInDisplayMode(arrayValue,userid);
}
}
function validStartDate()
{
	var valueOfElement=document.getElementById("startDate").value;
	var today=new Date();
	if((new Date(valueOfElement)).getDate()< today.getDate())
	{
		alert("Inavlid date:Start Date cannot be less than the current date");
		document.getElementById("startDate").focus();
		return false;
	}
	return true;
}
function validEndDate(IdOfElement){
	var valueOfStartDate=document.getElementById("startDate").value;
	var valueOfEndDate=IdOfElement.value;
	if((new Date(valueOfEndDate)).getDate()<(new Date(valueOfStartDate)).getDate())
	{
		alert(IdOfElement.id+"cannot be before Start Date");
		document.getElementById("endDate").focus();
		return false;
}
return true;
}

function changeStatusOfTodo(IdOfElement){
	let userRecordArray=JSON.parse(localStorage.getItem("registeredUserRecord"));
				var userid=sessionStorage.getItem("userId");
			if(IdOfElement.checked === true)
			{
			userRecordArray[userid].todoArray.todoStatus="isDone";
			}
			else
			{
				userRecordArray[userid].todoArray.todoStatus="isPending";
			}
			localStorage.setItem("registeredUserRecord",JSON.stringify(userRecordArray));
			
}