$(document).ready(readyNow);

let newTask = '';

function readyNow(){
   getAllTasks();
   $('#addBtn').on('click', addTask);
   $('#tableBody').on('click', '.statusBtn', changeStatus);
   $('#tableBody').on('click', '.deleteBtn', deleteTask);
}

function getAllTasks(){
   $.ajax({
      method: 'GET',
      url: '/todo'
   }).then(function(response){
      console.log('Current to-do list:', response);
      appendTasks(response);
   }).catch(function(error){
      console.log('GET request unsuccessful:', error);
   })
}

function addTask(event){
   event.preventDefault();
   let newTask = $('#taskInput').val();
   if(newTask === ''){
      alert('Cannot have missing information in task field');
      return;
   }
   $.ajax({
      method: 'POST',
      url: '/todo/add_task',
      data: {
         task: newTask
      }
   }).then(function(response){
      getAllTasks(); // get the updated database data
      $('#taskInput').val(''); //empty the input field
   }).catch(function(error){
      console.log('POST request unsuccessful:', error);
   })
}

function changeStatus(){
   let rowClicked = $(this).closest('tr');
   let taskId = rowClicked.data('task_id');
   let taskStatus = rowClicked.data('status')
   $.ajax({
      method: 'PUT',
      url: `/todo/status/${taskId}`,
      data: {
         status: taskStatus
      }
   }).then(function(response){
      console.log('Status changed');
      getAllTasks();
   }).catch(function(error){
      console.log('PUT request unsuccessful:', error);
   })
}

function deleteTask(){
   swal({
      title: "Delete Task?",
      text: "Think twice...",
      icon: "warning",
      buttons: true
   })
   .then((willDelete) => {
      if(willDelete) {
         swal("Successfully Deleted!", {icon: "success"});
         let rowClicked = $(this).closest('tr');
         let rowId = rowClicked.data('task_id');
         $.ajax({
            method: 'DELETE',
            url: `/todo/delete/${rowId}`
         }).then(function(response){
            getAllTasks();
            console.log('Deleted from list');
         }).catch(function(error){
            console.log('DELETE request unsuccessful:', error);
         })
      }
      else {
         swal("No Deletion...");
      }
   }); 
}

function appendTasks(arrOfObjs){
   $('#tableBody').empty();
   for(let obj of arrOfObjs){
      let newRow = '';
      if(obj.completed === 'Yes'){
         newRow = $(`<tr>
            <td class="checkedOff">${obj.task}</td>
            <td>${obj.completed}</td>
            <td><button class="statusBtn btn-success">Uncheck</button>
            <button class="deleteBtn btn-danger">Delete</button></td>
            </tr>`);
      }
      else {
         newRow = $(`<tr>
            <td>${obj.task}</td>
            <td>${obj.completed}</td>
            <td><button class="statusBtn btn-warning">Check</button>
            <button class="deleteBtn btn-danger">Delete</button></td>
            </tr>`);
      }
      $('#tableBody').append(newRow);
      // BELOW: important lines for each tr to have referrable identifiers
      newRow.data('task_id', obj.id);
      newRow.data('status', obj.completed);
   }
}
