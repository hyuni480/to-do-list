// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");





addButton.addEventListener("click", addTask);
//if(taskInput.value == ""){
//    addButton.disabled= true;
//}

function enterKey(){
    if(window.event.keyCode == 13){
        addTask();
    }
}

for(let i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        
        horizontalIndicator(event.currentTarget);
        filter(event);

    });
}

function horizontalIndicator(e) {
    underLine.style.left = e.offsetLeft + "px";
    underLine.style.width = e.offsetWidth + "px";
    underLine.style.top = e.offsetTop + e.offsetHeight + 6 + "px";
}

function addTask(){
    if(taskInput.value == ""){
        alert("할일을 입력해주세요.");
        return;
    }

    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };
    taskList.push(task);
    
    console.log(taskList);
    render();
    taskInput.value="";
}

function render(){


    // 1. 내가 선택한 탭에 따라서
    let list=[];
    if(mode === "all"){
        // all taskList
        list = taskList;

    } else if(mode === "ongoing" || mode === "done"){
        // ongoing, done  filterList
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다
    let resultHTML = "";

    for(let i =0; i <list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task done">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-rotate-left"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
            
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>`;
        }

        
        

    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    
    



    for(let i =0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render();
}

function deleteTask(id) {


    for(let i=0; i <taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    if(filterList != []){
        for(let i=0; i <filterList.length; i++){
            if(filterList[i].id == id){
                filterList.splice(i,1);
                break;
            }
        }
    } 
    
   
    render();
}

function filter(event){

    mode = event.target.id;
    
    if(mode == "all"){
        // 전체 리스트를 보여준다.
        render();
    } else if(mode == "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete = false
        filterList =[];
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode == "done"){
        // 끝나는 케이스
        // task.isComplete = true
        filterList =[];
        for(let i =0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();

    }
}





function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}