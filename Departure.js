// This script shows a random Scriptable API in a widget. The script is meant to be used with a widget configured on the Home Screen.
// You can run the script in the app to preview the widget or you can go to the Home Screen, add a new Scriptable widget and configure the widget to run this script.
// You can also try creating a shortcut that runs this script. Running the shortcut will show widget.
// let api = await randomAPI()
let widget = await createWidget()
if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentSmall()
}
// Calling Script.complete() signals to Scriptable that the script have finished running.
// This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
Script.complete()

async function createWidget(api) {
  
  let title = "Potstiege\nStadteinwärts"
  let widget = new ListWidget()
  // Add background gradient
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("141414"),
    new Color("13233F")
  ]
  widget.backgroundGradient = gradient
  // Show app icon and title
  let titleStack = widget.addStack()
//   let appIconElement = titleStack.addImage(appIcon)
//   appIconElement.imageSize = new Size(15, 15)
//   appIconElement.cornerRadius = 4
  titleStack.addSpacer(1)
  let titleElement = titleStack.addText(title)
  titleElement.textColor = Color.red()
  titleElement.textOpacity = 0.7
  titleElement.font = Font.boldSystemFont(14)
  widget.addSpacer(4)
  let departureTitle = widget.addText("Nächste Abfahrten")
  departureTitle.textColor = Color.white() 
  departureTitle.font = Font.systemFont(10)
  widget.addSpacer(2)
  
  // Show API
  const url = "https://rest.busradar.conterra.de/prod/haltestellen/4589102/abfahrten?sekunden=1800"
  const r = new Request(url)
  let resp = await r.loadJSON()
  var date = new Date();
  var hour = date.toLocaleString('de-DE', {hour: "numeric"});
  var minute = date.toLocaleString('de-DE', {minute: "numeric"});
  var result = "";
  for(var k in resp) {
//     console.log(resp[k].linienid);
    date = new Date(resp[k].tatsaechliche_abfahrtszeit * 1000);
    hour = date.toLocaleString('de-DE', {hour: "numeric"});
    minute = date.toLocaleString('de-DE', {minute: "numeric"});
  
    result = result + 'Line ' + resp[k].linienid + '\t' + hour.replace("Uhr",": ") + minute;
    if(k < resp.length - 1){
      result = result + '\n';
    }
//     console.log('Line ' + resp[k].linienid + '\t' + hour + ' ' + minute + ' Minuten' );
  }
//   console.log(resp[0].abfahrtszeit)
  let nameElement = widget.addText(result)
  nameElement.textColor = Color.white() 
  nameElement.font = Font.systemFont(14)
  widget.addSpacer(2)
  return widget
}



