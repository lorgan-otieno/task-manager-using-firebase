// initialize firbase with my config
firebase.initializeApp({
        apiKey: "API-KEY",
        authDomain: "LOG",
        projectId: "PROJECT-ID",
        storageBucket: "WEB-ID",
        messagingSenderId: "9452922umbers",
        appId: "0290580umbers" 
});

// declare a variable that will store our database object
const db = firebase.firestore();

// declare a function that'll add this task from our page to our database,which is the add function present on our button
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !=="") {
        db.collection("tasks").add({
            task:task,
            timestamp:firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

// declare function to render tasks on our webpage
function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('$(doc.id)')">Delete<button/>
    `;
taskList.appendChild(taskItem);

}

// add a realtime listener for tasks
db.collection("tasks")
.orderBy("timestamp","desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// declare a functin to delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}
