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
        var user = $('#user').val().replace('@','');
        if(res){
            //mandar ajax a endpoint
            $.get("/analizar?nombre='"+user+"'", function(data, status){
                dat = data[0].document_tone.tone_categories;
                var i = 0;
                
                for(categorie in dat){
                    for(tone in dat[categorie].tones){
                        i += 1;
                        $('#'+i).css('width',dat[categorie].tones[tone].score *100+'%');
                    }
                }
                if($("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
            
            $('#user').hide();
            $('#login').css('display','none');
            $('#analize').hide();
            $('#Emotion').toggleClass("w3-hide");
            $('#Language').toggleClass("w3-hide");
            $('#Social').toggleClass("w3-hide");
            $('#csv').toggleClass("w3-hide");
            $('#csv').attr("href","/csv?nombre='"+user+"'");
            });
            
        }else{
            if(!$("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
        }
    });
});