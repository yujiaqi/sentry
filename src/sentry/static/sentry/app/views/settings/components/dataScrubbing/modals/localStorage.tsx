import * as Sentry from '@sentry/browser';

import localStorage from 'app/utils/localStorage';

import {SourceSuggestion} from '../types';

const ADVANCED_DATA_SCRUBBING_LOCALSTORAGE_KEY = 'advanced-data-scrubbing';

type StorageValue = {
  eventId: string;
  sourceSuggestions: Array<SourceSuggestion>;
};

// TODO(Priscila): add the method below in app/utils
<<<<<<< HEAD
function fetchFromStorage(): StorageValue | undefined {
=======
const fetchFromStorage = (): StorageValue | undefined => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
  const storage = localStorage.getItem(ADVANCED_DATA_SCRUBBING_LOCALSTORAGE_KEY);
  if (!storage) {
    return undefined;
  }

  try {
    return JSON.parse(storage);
  } catch (err) {
    Sentry.withScope(scope => {
      scope.setExtra('storage', storage);
      Sentry.captureException(err);
    });
    return undefined;
  }
<<<<<<< HEAD
}

function saveToStorage(obj: StorageValue) {
=======
};

const saveToStorage = (obj: StorageValue) => {
>>>>>>> ref(pii): Replace dialog with GlobalModal
  try {
    localStorage.setItem(ADVANCED_DATA_SCRUBBING_LOCALSTORAGE_KEY, JSON.stringify(obj));
  } catch (err) {
    Sentry.captureException(err);
    Sentry.withScope(scope => {
      scope.setExtra('storage', obj);
      Sentry.captureException(err);
    });
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> ref(pii): Replace dialog with GlobalModal

export {fetchFromStorage, saveToStorage};
