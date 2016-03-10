const filenames = [
  'test/mdn-fling.json',
  'test/devtools-homepage-w-screenshots-trace.json'
]

var fs = require('fs')
var traceToTimelineModel = require('.')

if (!console.group) {
  console.group = (n) => console.log(n, ':')
  console.groupEnd = (n) => console.log('')
}

function report (filename) {
  var events = fs.readFileSync(filename, 'utf8')

  var model = traceToTimelineModel(events)

  console.group(filename)

  console.log('Timeline model events:\n', model.timelineModel.mainThreadEvents().length)
  console.log('IR model interactions\n', model.irModel.interactionRecords().length)
  console.log('Frame model frames:\n', model.frameModel.frames().length)
  console.log('Filmstrip model screenshots:\n', model.filmStripModel.frames().length)

  console.log('Top down tree total time:\n', model.topDown.totalTime)
  console.log('Bottom up tree leaves:\n', [...model.bottomUp.children.entries()].length)
  // console.log('Top down tree, grouped by URL:\n', model.topDownGroupedUnsorted)
  var topCosts = [...model.bottomUpGroupedSorted.children.values()]
  var secondTopCost = topCosts[1]
  console.log('Bottom up tree, grouped, 2nd top URL:\n', secondTopCost.totalTime.toFixed(2), secondTopCost.id)

  // console.log('Tracing model:\n', model.tracingModel)
  // console.log('Timeline model:\n', model.timelineModel)
  // console.log('IR model:\n', model.irModel)
  // console.log('Frame model:\n', model.frameModel)
  // console.log('Filmstrip model:\n', model.filmStripModel)

  // console.log('Top down tree:\n', model.topDown)
  // console.log('Bottom up tree:\n', model.bottomUp)
  // // console.log('Top down tree, grouped by URL:\n', model.topDownGroupedUnsorted)
  // console.log('Bottom up tree grouped by URL:\n', model.bottomUpGroupedSorted)

  console.groupEnd(filename)
}

filenames.forEach(report)
