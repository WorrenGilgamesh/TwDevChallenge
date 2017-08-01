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
        var user = $('#user').val().replace('@','').replace('#','');
        if(res){
            //mandar ajax a endpoint
            $.get("/analizar?nombre='"+user+"'", function(data, status){
                //console.log(data);
                //analizar tonos de tweets en promedio
                var avgs = [];
                for(var j = 0; j < data.length - 1; j++){
                    var dat = data[j].document_tone.tone_categories;
                    var i = 0;
                    for(categorie in dat){
                        for(tone in dat[categorie].tones){
                            i += 1;
                            if(i > avgs.length){
                                avgs.push(dat[categorie].tones[tone].score);
                            }else{
                                avgs[i - 1] += dat[categorie].tones[tone].score;
                            }
                        }
                    }
                }
                avgs = avgs.map(function(item){
                    return item / data.length;
                });
                for(var i = 1; i <= avgs.length; i++){
                    $('#'+i).css('width',avgs[i-1] *100+'%');
                    $('#'+i).css('color','black!important;');
                    $('#'+i).text($('#'+i).text()+' '+(avgs[i-1] *100).toFixed(2)+'%');
                }

                //analizar tonos de oraciones de tweeter
                var tweets = {};
                for(var j = 0; j < data.length - 1; j++){
                    if(data[j].sentences_tone){
                        for(var i = 0; i < data[j].sentences_tone.length - 1; i++){
                            var sentence = data[j].sentences_tone[i];
                            tweets[sentence.text] = {};
                            for(categorie in sentence.tone_categories){
                                for(tone in sentence.tone_categories[categorie].tones){
                                    tweets[sentence.text][sentence.tone_categories[categorie].tones[tone].tone_name]=sentence.tone_categories[categorie].tones[tone].score;
                                }
                            }
                        }
                    }
                }
                //console.log(tweets);
                for(sentence in  tweets){
                    var tones = [];
                    for(tone in tweets[sentence]){
                        if(tweets[sentence][tone] < 0.5){
                            tones.push('light_'+tone);
                        }else if(tweets[sentence][tone] > 0.5){
                            tones.push('medium_'+tone);
                        }else{
                            tones.push(tone);
                        }
                    }
                    tones = tones.reduce(function(total,current){
                        return total + ' ' + current;
                    },'');
                    $('#sentences').append('<p class="'+tones+'">'+sentence+'</p>');
                }
                $('#Anger').hover(function(){
                    $('.Anger').toggleClass('w3-red');
                    $('.medium_Anger').toggleClass('w3-text-red');
                },function(){
                    $('.Anger').toggleClass('w3-red');
                    $('.medium_Anger').toggleClass('w3-text-red');
                });

                $('#Disgust').hover(function(){
                    $('.Disgust').toggleClass('w3-deep-purple');
                    $('.medium_Disgust').toggleClass('w3-text-deep-purple');
                },function(){
                    $('.Disgust').toggleClass('w3-deep-purple');
                    $('.medium_Disgust').toggleClass('w3-text-deep-purple');
                });
                $('#Fear').hover(function(){
                    $('.Fear').toggleClass('w3-green');
                    $('.medium_Fear').toggleClass('w3-text-green');
                },function(){
                    $('.Fear').toggleClass('w3-green');
                    $('.medium_Fear').toggleClass('w3-text-green');
                });

                $('#Joy').hover(function(){
                    $('.Joy').toggleClass('w3-yellow');
                    $('.medium_Joy').toggleClass('w3-text-yellow');
                },function(){
                    $('.Joy').toggleClass('w3-yellow');
                    $('.medium_Joy').toggleClass('w3-text-yellow');
                });

                $('#Sadness').hover(function(){
                    $('.Sadness').toggleClass('w3-indigo');
                    $('.medium_Sadness').toggleClass('w3-text-indigo');
                },function(){
                    $('.Sadness').toggleClass('w3-indigo');
                    $('.medium_Sadness').toggleClass('w3-text-indigo');
                });

                $('#Analytical').hover(function(){
                    $('.Analytical').toggleClass('w3-orange');
                    $('.medium_Analytical').toggleClass('w3-text-orange');
                },function(){
                    $('.Analytical').toggleClass('w3-orange');
                    $('.medium_Analytical').toggleClass('w3-text-orange');
                });

                $('#Confident').hover(function(){
                    $('.Confident').toggleClass('w3-teal');
                    $('.medium_Confident').toggleClass('w3-text-teal');
                },function(){
                    $('.Confident').toggleClass('w3-teal');
                    $('.medium_Confident').toggleClass('w3-text-teal');
                });

                $('#Tentative').hover(function(){
                    $('.Tentative').toggleClass('w3-lime');
                    $('.medium_Tentative').toggleClass('w3-text-lime');
                },function(){
                    $('.Tentative').toggleClass('w3-lime');
                    $('.medium_Tentative').toggleClass('w3-text-lime');
                });

                $('#Openness').hover(function(){
                    $('.Openness').toggleClass('w3-pink');
                    $('.medium_Openness').toggleClass('w3-text-pink');
                },function(){
                    $('.Openness').toggleClass('w3-pink');
                    $('.medium_Openness').toggleClass('w3-text-pink');
                });
                
                $('#Conscientiousness').hover(function(){
                    $('.Conscientiousness').toggleClass('w3-deep-orange');
                    $('.medium_Conscientiousness').toggleClass('w3-text-deep-orange');
                },function(){
                    $('.Conscientiousness').toggleClass('w3-deep-orange');
                    $('.medium_Conscientiousness').toggleClass('w3-text-deep-orange');
                });

                $('#Extraversion').hover(function(){
                    $('.Extraversion').toggleClass('w3-indigo');
                    $('.medium_Extraversion').toggleClass('w3-text-indigo');
                },function(){
                    $('.Extraversion').toggleClass('w3-indigo');
                    $('.medium_Extraversion').toggleClass('w3-text-indigo');
                });

                $('#Agreeableness').hover(function(){
                    $('.Agreeableness').toggleClass('w3-red');
                    $('.medium_Agreeableness').toggleClass('w3-text-red');
                },function(){
                    $('.Agreeableness').toggleClass('w3-red');
                    $('.medium_Agreeableness').toggleClass('w3-text-red');
                });

                $('#Emotional').hover(function(){
                    $('.Emotional').toggleClass('w3-yellow');
                    $('.medium_Emotional').toggleClass('w3-text-yellow');
                },function(){
                    $('.Emotional').toggleClass('w3-yellow');
                    $('.medium_Emotional').toggleClass('w3-text-yellow');
                });
                
                if($("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
            
            $('#user').hide();
            $('#login').css('display','none');
            $('#analize').hide();
            $('#Emotion').toggleClass("w3-hide");
            $('#Language').toggleClass("w3-hide");
            $('#Social').toggleClass("w3-hide");
            $('#Tweets').toggleClass("w3-hide");
            $('#csv').toggleClass("w3-hide");
            $('#csv').attr("href","/csv?nombre='"+user+"'");
            });
            
        }else{
            if(!$("#user").hasClass('w3-border-red'))
                $("#user").toggleClass("w3-border-red w3-text-red");
        }
    });
});