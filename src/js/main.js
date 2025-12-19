// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import styles
import '../scss/styles.scss';

// const server_url = "https://hub.computelite.com";

// const btn_class =   { 
//                         customClass:    {
//                                             confirmButton: 'btn btn-dark',
//                                             cancelButton: 'btn btn-secondary ms-3'
//                                         },
//                         buttonsStyling: false,
//                         reverseButtons: true,
//                         confirmButtonText: "OK",
//                         cancelButtonText: 'Cancel',
//                         showCancelButton: false
//                     }

// async function postData(url = '', data = {}) {
//     // Default options are marked with *
//     const session_var = Object.keys(sessionStorage)
//     if (session_var.indexOf("owner_name") > -1 && sessionStorage["owner_name"] !== "None") {
//         data["owner_name"] = sessionStorage["owner_name"]
//     }
//     if (session_var.indexOf("model_name") > -1 && sessionStorage["model_name"] !== "None") {
//         data["model_name"] = sessionStorage["model_name"]
//     }
//     if (session_var.indexOf("table_name") > -1 && sessionStorage["table_name"] !== "None" && url.search('/grid')>-1) {
//         data["table_name"] = sessionStorage["table_name"]
//     }

//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     if (response.status == 200) {
//         if (response.headers.get('Content-Type') == 'application/json') {
//             return response.json(); // parses JSON response into native JavaScript objects
//         } else {
//             blobType = response.headers.get('Content-Type')
//             file_name = response.headers.get('Content-Disposition').split("filename=")[1].slice(0, -1)
//             response.blob().then(blob_obj => downloadFile(blob_obj, file_name, blobType))
//         }
//     } else if (response.status == 401) {
//         window.location.href = "/sign-in";
//     } else if (response.status == 403) {
//         window.location.href = "/sign-out";
//     }
//     else {
//         let val = await response.text()
//         confirmBox("Oops!", val)

//         if (document.getElementById("data-loader")){
//             if (document.getElementById("data-loader").style.display == ""){
//                 document.getElementById("data-loader").style.display = "none"
//             }
//         }
//         return Promise.reject(new Error(val))
//     }
// }

// function confirmBox(title, content, action = null, cancel = null) {

//     if (cancel){    
//         btn_class.customClass.confirmButton =  'btn btn-primary ml-auto' 
//         btn_class.showCancelButton = true
//     } else {
//         btn_class.customClass.confirmButton =  'btn btn-primary' 
//         btn_class.showCancelButton = false
//     }

//     swal_dict = {}
//     swal_dict['allowOutsideClick'] = false
//     if (title == ""){
//         swal_dict['icon'] = "info"
//         title = "Info"
//     } else if (title.toLowerCase().substring(0, 7) == "success"){
//         swal_dict['icon'] = "success"
//     } else if (title.toLowerCase().substring(0, 5) == "error"){
//         swal_dict['icon'] = "error"
//     } else if (title.toLowerCase().substring(0, 7) == "warning"){
//         swal_dict['icon'] = "warning"
//     } else if (title.toLowerCase().substring(0, 5) == "alert"){
//         swal_dict['icon'] = "warning"
//     } else if (title.toLowerCase().substring(0, 4) == "oops"){
//         swal_dict['icon'] = "warning"
//     }

//     swal_dict['title'] = title
//     if(typeof(content)!="string"){
//         swal_dict['html'] = content
//     }else{
//         swal_dict['text'] = content
//     }

//     const swal_mixin = Swal.mixin(btn_class);

//     swal_mixin.fire(swal_dict).then((result) => {
//         if (result.isConfirmed && action) {
//             action()
//         } else if (result.isDenied && cancel) {
//             cancel()
//         }
//     });
// }

// function get_scc_element(tagname, classlist, id = null, childelement = null) {
//     let element = document.createElement(tagname)
//     if (id) {
//         element.id = id
//     }
//     if (classlist) {
//         class_names = classlist.split(" ")
//         for (let class_name of class_names) {
//             element.classList.add(class_name)
//         }
//     }
//     if (childelement) {
//         element.appendChild(childelement)
//     }
//     return element
// }

// function downloadFile(blob, filename, blobType) {
//     // It is necessary to create a new blob object with mime-type explicitly set
//     // otherwise only Chrome works like it should
//     var newBlob = new Blob([blob], { type: blobType })

//     // IE doesn't allow using a blob object directly as link href
//     // instead it is necessary to use msSaveOrOpenBlob
//     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//         window.navigator.msSaveOrOpenBlob(newBlob);
//         return;
//     }

//     // For other browsers: 
//     // Create a link pointing to the ObjectURL containing the blob.
//     const data = window.URL.createObjectURL(newBlob);
//     var link = document.createElement('a');
//     link.href = data;
//     link.download = filename;
//     link.click();
//     setTimeout(function () {
//         // For Firefox it is necessary to delay revoking the ObjectURL
//         window.URL.revokeObjectURL(data);
//     }, 1000);
// }

// async function postFile(url, file, data = {}) {
//     const session_var = Object.keys(sessionStorage)
//     if (session_var.indexOf("owner_name") > -1 && sessionStorage["owner_name"] !== "None") {
//         data["owner_name"] = sessionStorage["owner_name"]
//     }
//     if (session_var.indexOf("model_name") > -1 && sessionStorage["model_name"] !== "None") {
//         if(!data["model_name"]){
//             data["model_name"] = sessionStorage["model_name"]
//         }        
//     }
//     if (session_var.indexOf("table_name") > -1 && sessionStorage["table_name"] !== "None") {
//         data["table_name"] = sessionStorage["table_name"]
//     }

//     let formData = new FormData();
//     if (file){
//         formData.append("file", file);
//     }

//     for (key in data) {
//         formData.append(key, data[key])
//     }
    
//     const response = await fetch(url, { method: "POST", body: formData })
//     if (response.status == 200) {
//         return response.json(); // parses JSON response into native JavaScript objects
//     } else if (response.status == 401) {
//         window.location.href = "/sign-in";
//     } else if (response.status == 403) {
//         window.location.href = "/sign-out";
//     }
//     else {
//         let val = await response.text()
//         confirmBox("Error!", val)
//         return Promise.reject(new Error(val))
//     }

// }
