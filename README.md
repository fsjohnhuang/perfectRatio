# PerfectRatio.js
A little standalone library to detect the scaling of browser which is helpful to provide the best user experience as you and your team wish.

## Usage
```
var pr = perfectRatio.pr()
pr.addEventListener("ratio-changed"
  , evt => {
    switch(evt.detail){
      case perfectRatio.PERFECT:
        // Congratuations, the user agent is in the perfect scaling now.
        break;
      case perfectRatio.ZOOM:
        // So sorry, the scaling is not perfect now and the console pane is open.
        break;
      case perfectRatio.ZOOM_IN:
        // So sorry, the scaling is not perfect now.
        break;
      case perfectRatio.ZOOM_OUT:
        // So sorry, the scaling is not perfect now.
        break;
    }
  })
// start to detect the changes of ratio
pr.detect()
```

## API
### Methods
#### `perfectRatio.pr()`
**@description** Gets the `PR` instance. CAUTIONS: It would returns the same one no matter where and when you call.
**@return** `{PR}`
### Const Fields
#### `perfectRatio.PERFECT`
**@description** Means the user agent is in the perfect scaling.
#### `perfectRatio.ZOOM`
**@description** Means the user agent is not in the perfect scaling.
#### `perfectRatio.ZOOM_IN`
**@description** Means the scaling of user agent is greater than 100%.
#### `perfectRatio.ZOOM_OUT`
**@description** Means the scaling of user agent is less than 100%.

### `PR`'s Methods
#### `PR#getRatioStatus()`
**@description** Gets the current ratio status<br>
**@return** `{PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}`

#### `PR#getPerfectRatio()`
**@description** Gets the perfect ratio<br>
**@return** `{Number}`

#### `PR#calcInRatio(num)`
**@description** Transforms the input number to what is fit to current ratio<br>
**@param** `{Number} num` original number<br>
**@return** `{Number}`

#### `PR#addEventListener(eventType, f)`
**@description** Listens to the specificed event type which is fired by PR instance.
**@param** `{Number} eventType` specified event type
**@param** `{Number} f` event handler

#### `PR#removeEventListener(eventType, f)`
**@description** Removes event listener of the specificed event type which is fired by PR instance.<br>
**@param** `{Number} eventType` specified event type<br>
**@param** `{Number} f` event handler

#### `PR#detect(delay)`
**@description** Turns the PR instance to detect the changes of ratio.<br>
**@param** `{Number} [delay=50]` delay time of debounce

### `PR`'s Events
#### ratio-changed
**@description** It would be fired when the ratio of user agent changes. CAUTIONS: Canceling and bubbles is not supported to this event type.<br>
**Event#detail** `{PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}`

## Browser Compatibility
<table style="table-laytou:fixed;width:100%;border-collapse:collapsed;">
  <tr>
    <th>IE</th>
    <th>Chrome</th>
  </tr>
  <tr>
    <td>11</td>
    <td>64</td>
  </tr>
</table>

## Roadmap
### v0.3.1
1. Fixs bugs found in IE11.

## Log
### v0.3.0
1. Change to code by ES6+, and construct the project by webpack2.
### v0.2.0
1. Use singleton pattern to create or get the instance of PerfectRatio.
2. Fire ratio-changed event when ratio is changed.
### v0.1.0
Initializes this project.
