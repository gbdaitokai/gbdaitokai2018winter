var eventId = '96596';
var url = 'https://connpass.com/api/v1/event/?event_id=' + eventId;
var eventUrl = '';
var data = fetchJsonp(url).then(function(response) {
  return response.json()
}).then(function(data){
  applyEventData(data);
}).catch(function(err) {
  console.error(url, err.status, err);
});

function applyEventData(data) {
  console.log(data);
  var event = data.events[0];
  eventUrl = event.event_url;
  var title = event.title;
  var hashTag = event.hash_tag;
  document.title = title;
  document.getElementById('title').innerText = title;
  document.getElementById('footer').innerText = title;
  var datetime = moment(event.started_at).format('YYYY-MM-DD(ddd) HH:mm - ') + 
                 moment(event.ended_at).format('HH:mm');
  var twUrl = 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(title + ' ' + eventUrl + ' #' + hashTag) + '&amp;url=' + encodeURIComponent(title);
  document.getElementById('share-tw').href = twUrl;
  var fbUrl = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(eventUrl) + '&amp;t=' + encodeURIComponent(title);
  document.getElementById('share-fb').href = fbUrl;
  var gpUrl = 'https://plus.google.com/share?url=' + encodeURIComponent(eventUrl);
  document.getElementById('share-gp').href = gpUrl;
  document.getElementById('datetime').innerText = datetime;
  document.getElementById('description').innerHTML = event.description;
}

function join() {
  console.log(eventUrl);
  if (!eventUrl) return;
  location.href = eventUrl;
}