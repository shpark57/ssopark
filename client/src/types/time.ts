export const getTimeString = () => {
    //현재시간 년-월-일 시:분:초 로 추출

    var today = new Date();   
    var year = today.getFullYear()
    var month = ('0' + (today.getMonth()+1)).slice(-2); 
    var day = ('0' + today.getDate()).slice(-2); 
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    
    var timeString = year +'-'+month+'-'+day+' '+  hours + ':' + minutes  + ':' + seconds;    
    return timeString;
}


export const toDateString = (time:string) => {
    //지정시간 년-월-일 시:분:초 로 추출

    var today = new Date(time);   
    var year = today.getFullYear()
    var month = ('0' + (today.getMonth()+1)).slice(-2); 
    var day = ('0' + today.getDate()).slice(-2); 
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    
    var timeString = year +'-'+month+'-'+day+' '+  hours + ':' + minutes  + ':' + seconds;    
    return timeString;
}