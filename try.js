const mainbr=`<td style="text-align: center; "><input class="firstclass" type="number" style="width:70px;font-weight:bold; font-size:17px;text-align:center;">-- <input  class="secondclass" type="number"style="width:70px;font-weight:bold;font-size:17px;text-align:center;"></td>
<td><input class="frequency" style="width:100px;font-weight:bold; text-align:center;" type="number"></td>
<td class="midvalue" id="besttext"></td>
<td class="f.m" id="besttext"></td>
<td class="c.f" id="besttext"></td>
<td class="fmm" id="besttext"></td>`
let medianresult=document.getElementById('medianresult')
let realmean;
let sdresult=document.getElementById('standard')
let firstclick=document.getElementById("button-addon2")
console.log(firstclick)
let table=document.getElementsByClassName('table1')
let mdclass,q1class,q3class,aclw,acup,accf,acf,finalmd,classin,sdsum=0
let actualsd,mdr,q1r,q3r,frequency=[],fm=[],sdf=[],cf=[],sumf=0,sumfm=0,upperclass=[],lowerclass=[],midvalue=[],i,j,min,max,diff,fmclass,frequencyclass,midvalueclass,upclass,lwclass,sdclass;
function fillup()
    {
        min= Number.parseInt(document.getElementById('min').value)
        max= Number.parseInt(document.getElementById('max').value)
        diff= Number.parseInt(document.getElementById('dif').value)
        console.log(min,max,diff)
        for(i=0;i<userinput;i++)
        {
            upclass[i].value=min
            lwclass[i].value=min+diff
            min=min+diff
        }
    }
// first veeryhing is now astarrted
function geteverything()
    {
        document.getElementById("button").innerHTML='<button class ="buto" >GET RESULT</button>'

    }
 // this is very first processs and here we go
function firstprocess()
    {
        document.getElementsByClassName('get')[0].innerHTML=`<input type="number" placeholder="min" id="min"><input id="max" type="number" placeholder="max"><input type="number" placeholder="dif" id="dif"> <button class="buto" onclick="fillup()">GET</button>`
        document.getElementsByClassName("table1")[0].innerHTML=''
        userinput=document.getElementById("firstinput").value
        if(firstinput<0 || firstinput==="")
        {
            alert("enter valid number ,i.e: not less than 0. FOOOL!!!")
        }
        for(i=1;i<=userinput;i++)
        {
            
            firstelm=document.createElement("tr")
            firstelm.innerHTML=mainbr
            document.getElementsByClassName("table1")[0].appendChild(firstelm)
        }
        upclass=document.getElementsByClassName("firstclass")
        lwclass=document.getElementsByClassName("secondclass")
        frequencyclass=document.getElementsByClassName("frequency")
        midvalueclass=document.getElementsByClassName('midvalue')
        fmclass=document.getElementsByClassName("f.m")
        cfclass=document.getElementsByClassName('c.f')
        sdclass=document.getElementsByClassName('fmm')

        geteverything()
    }
// HERE FIRST PROCESS ENDEDE //
function median(md)
{
    
    for(i=1;i<userinput;i++)
    {
        console.log(md)
        if(md > Number.parseInt(cfclass[i-1].innerHTML) && md < Number.parseInt(cfclass[i].innerHTML))
        {
            console.log('am in')
            aclw= lowerclass[i]
            acup=upperclass[i]
            acf=frequency[i]
            accf=Number.parseInt(cfclass[i-1].innerHTML)
            console.log(aclw,acup,acf,accf)
            break;

        }
        
        
    }
    classin= lowerclass[0]-upperclass[0]
    
    finalmd= Number(acup+(md-accf)/acf*classin).toFixed(2)
    return [aclw,acup,acf,accf,finalmd]
}
//MEDIA FUNCTION ENEDE, 

//                                    ****** SD IS HERE

function sd(mean)
{
    sdsum=0;
    for(i=0;i<userinput;i++)
    {
        sdf[i]=  Number(frequency[i]*(midvalue[i]-mean)**2)
        sdclass[i].innerHTML= (sdf[i]).toFixed(2)
        sdsum=Number.parseFloat(sdsum)+Number.parseFloat(sdf[i])
    }
    actualsd= (Math.sqrt(sdsum/sumf)).toFixed(2)
    console.log(sdsum/sumf)
    console.log(actualsd)
    return [actualsd,(sdsum).toFixed(2)]
}





// ************************************ WAS LAST PROCESS
    function lastbutton()
    
    {
            for(i=0;i<userinput;i++)
        {
            frequency[i]=Number.parseInt(frequencyclass[i].value)
            upperclass[i]=Number.parseInt(upclass[i].value)
            lowerclass[i]=Number.parseInt(lwclass[i].value)
            midvalue[i]=(upperclass[i]+lowerclass[i])/2
            fm[i]=midvalue[i]*frequency[i]
            sumfm+=fm[i]
            sumf+=frequency[i]
            cf[i]=sumf
           
            midvalueclass[i].innerHTML=midvalue[i]
            fmclass[i].innerHTML=fm[i]
            cfclass[i].innerHTML=cf[i]
            
     } 
     console.log(median(sumf/2))
     document.getElementById("result").innerHTML=`N=${sumf}          Σf.m=${sumfm} <br>
     MEAN(x̄)= Σf.m/N <br>
      MEAN(x̄)=${(sumfm/sumf).toFixed(2)}`
      mdr= median(sumf/2)
      q1r=median(sumf/4)
      q3r=median(sumf/4*3)
      realmean=sumfm/sumf
      medianresult.innerHTML=`for M.D, class =${mdr[1]+'--' +mdr[0]} c.f=${mdr[3]},f=${mdr[2]} L=${mdr[1]} <br>
      for Q.1, class =${q1r[1]+'--' +q1r[0]} c.f=${q1r[3]},f=${q1r[2]} L=${q1r[1]} <br>
      for Q.3, class =${q3r[1]+'--' +q3r[0]} c.f=${q3r[3]},f=${q3r[2]} L=${q3r[1]} 
      <br>
      M.d= ${mdr[4]},    Q.1=${q1r[4]},    Q.3=${q3r[4]}
      `
      sdresult.innerHTML=`Σf(m-x̄)²== ${sd(realmean)[1]} AND N == ${sumf} <br>
      S.D=  ${sd(realmean)[0]}`
    }

    // ACTUAL CALCULATION IS ENDED HERE AND JUST ENJOY
     function lastprocess()
     {
         sumf=0;sumfm=0;sdsum=0
         for(i=0;i<userinput;i++)
         {
             if(upclass[i].value=='')
             {
                 upclass[i].value=0
             }
             if(lwclass[i].value=='')
             {
                 lwclass[i].value=0
             }
             if(frequencyclass[i].value=='')
             {
                 frequencyclass[i].value=0
             }
         }
         lastbutton()
     }
     function hero(hi)
     {
        if(hi.target.className=="firstclass" || hi.target.className=="secondclass" || hi.target.className=="frequency")
        {
           
            hi.target.addEventListener('keydown',(event)=>{
                
                if(event.key=="Enter"){lastprocess()}})
        }
    }
     
   table[0].addEventListener('click',hero)
   console.log(table[0])
