
let widget = await createWidget()
if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentSmall()
}

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
  
  // Get bus departure
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



