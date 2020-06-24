import {fetchFromStorage, saveToStorage} from './localStorage';
import {EventIdStatus, EventId} from '../types';
import {valueSuggestions} from '../utils';

<<<<<<< HEAD
function fetchSourceGroupData() {
=======
const fetchSourceGroupData = () => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
  const fetchedSourceGroupData = fetchFromStorage();
  if (!fetchedSourceGroupData) {
    const sourceGroupData: Parameters<typeof saveToStorage>[0] = {
      eventId: '',
      sourceSuggestions: valueSuggestions,
    };
    saveToStorage(sourceGroupData);
    return sourceGroupData;
  }
  return fetchedSourceGroupData;
<<<<<<< HEAD
}

function saveToSourceGroupData(eventId: EventId, sourceSuggestions = valueSuggestions) {
=======
};

const saveToSourceGroupData = (
  eventId: EventId,
  sourceSuggestions = valueSuggestions
) => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
  switch (eventId.status) {
    case EventIdStatus.LOADING:
      break;
    case EventIdStatus.LOADED:
      saveToStorage({eventId: eventId.value, sourceSuggestions});
      break;
    default:
      saveToStorage({eventId: '', sourceSuggestions});
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> ref(pii): Replace dialog with GlobalModal

export {fetchSourceGroupData, saveToSourceGroupData};
