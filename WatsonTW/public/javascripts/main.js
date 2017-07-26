$(document).ready(function(){

    function ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
    }


    $('#analize').click(function(){
        var patt = new RegExp(".[a-zA-Z0-9]+");
        var res = patt.test($('#user').val());
        if(res){
            //mandar ajax a endpoint
            $.get("demo_test.asp", function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
            });
            if($("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
            
            $('#user').hide();
            $('#login').css('display','none');
            $('#analize').hide();
            $('#Emotion').toggleClass("w3-hide");
            $('#Language').toggleClass("w3-hide");
            $('#Social').toggleClass("w3-hide");
            $('#csv').toggleClass("w3-hide");
        }else{
            if(!$("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
        }
    });
});