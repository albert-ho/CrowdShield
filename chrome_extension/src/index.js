var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
   alert("Database error: " + event.target.errorCode);
};
request.onsuccess = function(event) {
  db = event.target.result;
  alert('yay!');
};
