const Discord = require('discord.js')
const client = new Discord.Client();
const puppeteer = require('puppeteer')
client.login("Token")
client.on("ready",async() =>{
    console.log("Aktif")
});
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
          width: 1024,
          height: 768,
        },
      });
    client.on("message",async(message) =>{
        
        if(message.guild && message.channel.id == "KANAL ID"  && message.content == "!whatsapp" && message.author.id == "KULLANACAK KİŞİ ID"){
            let msg = await message.channel.send("Lütfen bekle.")
            const page = await browser.newPage();
            msg.edit("Lütfen bekle..")
            await page.goto('https://web.whatsapp.com/')
            msg.edit("Lütfen bekle...")
            await page.waitForSelector('canvas')
            msg.edit("Lütfen bekle....")
            //bekle(1)
            
            await page.screenshot({path: "whatsapp-screen.png"})
            let qrcode = await message.channel.send({
                files:[
                    {
                        attachment: 'whatsapp-screen.png',
                        name: 'whatsapp.png'
                    }
                ]
            })
            await msg.edit('Lütfen QR Kodu tarat. (\`15 Sn.\` Kaldı)')
            //await page.waitForSelector('')

            bekle(5)
            qrcode.delete()
            await page.screenshot({path: "whatsapp-screen.png"})
            qrcode = await message.channel.send({
                files:[
                    {
                        attachment: 'whatsapp-screen.png',
                        name: 'whatsapp.png'
                    }
                ]
            })
            await msg.edit('Lütfen QR Kodu **tekrar** tarat. (\`10 Sn.\` Kaldı)')
            bekle(5)
            await msg.edit('Lütfen QR Kodu **tekrar** tarat. (\`5 Sn.\` Kaldı)')
            bekle(2)
            await msg.edit('Lütfen QR Kodu **tekrar** tarat. (\`3 Sn.\` Kaldı)')
            bekle(1)
            await msg.edit('Lütfen QR Kodu **tekrar** tarat. (\`2 Sn.\` Kaldı)')
            bekle(1)
            await msg.edit('Lütfen QR Kodu **tekrar** tarat. (\`1 Sn.\` Kaldı)')
            bekle(1)
            await qrcode.delete()
            await msg.edit('Giriş kontrol ediliyor.')
            bekle(1)
            const checkLoginx = `div[class="_3OvU8"]`;      
            let checkLogin = await page.evaluate(v => {
                try{
                    return document.querySelector(v).innerHTML
                }catch(err){
                    console.log(err)
                    return "https://unqown.xyz"
                }
            }, checkLoginx);
            if(checkLogin !== "https://unqown.xyz"){
                await msg.edit('Giriş yapıldı.')
                await msg.edit('Kim için Stalk yapmak istiyorsun? (Kayıtlı kişi ismi gir (`20 Sn.` Kaldı))').then(async f => {
                var filter = m => m.author.id === message.author.id;
                
                    message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 20000,
                      errors: ['time']
                    }).then(async collected => {
                        let kişi = collected.first().content
                        collected.first().delete();
                        msg.edit(`Lütfen bekle, kişinin varlığı kontrol ediliyor...`)
                        const checkUserx = `span[title="${kişi}"]`;      
                         let checkUser = await page.evaluate(v => {
                             try{
                                 return document.querySelector(v).innerHTML
                             }catch(err){
                                 console.log(err)
                                 return "https://unqown.xyz"
                             }
                         }, checkUserx);
                         if(checkUser !== "https://unqown.xyz"){
                            msg.edit(`Kişi bulundu.`)
                            page.click(checkUserx)
                            var cameOnline = false;
                            var starttime;
                            var endtime;
                            var running = -1;
                            running = setInterval(f, 1000);
                            msg.edit(`Kişi izlemeye konuldu. Artık DM kutuna veriler aktarılacak.`)
                            return running;
                            async function f(){
                                try{
                                    const name = await page.evaluate(async() => {
                                        return document.querySelector('#main > header > div._24-Ff > div > div > span').textContent  
                                    })
                                    
                                    const statusDiv = await page.evaluate(async() => {
                                        return document.querySelector('#main > header > div._24-Ff > div.zzgSd._3e6xi > span').innerText  
                                      })

                                      const dpDiv = await page.evaluate(async() => {
                                        return document.querySelector('#main > header > div._2YnE3 > div > img')  
                                      })
                                    const status = statusDiv ? statusDiv.textContent : null;
                                    const dp_url = dpDiv ? dpDiv.src : 'https://media.discordapp.net/attachments/798849910203875388/924078228178620427/whatsapp.png';
                                    console.log(`
                                    Name: ${name}
                                    StatusDiv: ${statusDiv}
                                    dpDiv: ${dpDiv}
                                    Status: ${status}
                                    URL: ${dp_url}
                                    `)
                                    const dt = new Date();
                                    const time = dt.toLocaleTimeString() + ', ' + dt.toLocaleDateString();
                                    if (status === null && cameOnline === true) {
                                        console.log(122)
                                        cameOnline = false;
                                        endtime = new Date().getTime();
                                        const diff = parseInt( (endtime - starttime) / 1000 );
                                        const duration = `${ parseInt(diff / 60) } Dakika ve ${ diff % 60 } saniye`;


                                        
                                        console.log(`${name}: ${time}, Çevrimdışı oldu`);
                                        console.log(`Süre: ${duration}`);
                                        
                                        const startDate = new Date(starttime).toLocaleTimeString();
                                        const endDate = new Date(endtime).toLocaleTimeString();
                                        
                                        message.author.send(new Discord.MessageEmbed()
                                        .setDescription(`${name} Çevrimdışı oldu\nÇevrimiçi olma süresi: ${duration}\nÇevrimiçi: ${startDate}\nÇevrimdışı: ${endDate}`)
                                        .setImage(dp_url)).catch(a => {})
                                        
                                    }else if ((status === "çevrimiçi" || status === "yazıyor…") && (cameOnline === false)) {
                                        console.log(141)
                                        console.log("STATUS: " + status)
                                        if(status == "yazıyor..."){
                                            message.author.send(new Discord.MessageEmbed()
                                            .setDescription(`${name} Yazıyor...`)
                                            .setImage(dp_url))
                                        }
                                        cameOnline = true;
                                        starttime = new Date().getTime();
                                        const startDate = new Date(starttime).toLocaleTimeString();
                                        const endDate = new Date(endtime).toLocaleTimeString();
                                        console.log(`${name}: ${time}, Çevrimiçi`);
                                        

                                        message.author.send(new Discord.MessageEmbed()
                                        .setDescription(`${name} Şu an çevrimiçi\nSaat: ${startDate},${endDate}`)
                                        .setImage(dp_url))

                                    }
                                }catch(err){
                                    console.log(err)
                                    //return browser.close(); 
                                }
                            }
                         }else{
                             msg.edit(`Kişi bulunamadı.`)
                             browser.close();
                         }
                    })
                })
            }else{
                await msg.edit('Giriş yapılamadı.')
                browser.close();
            }
        }else{
            if(message.content == "!whatsapp") return message.reply("LoL")
        }
    })
})()
function bekle(seconds) {
    //basit bloklama beklemesi
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) { }
  }
