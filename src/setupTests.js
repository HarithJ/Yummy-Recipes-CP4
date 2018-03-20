
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.event = {
  target: { value: '' },
  preventDefault: jest.fn(),
};

global.localStorage = new LocalStorageMock;
global.localStorage.setItem("accessToken", "'sakjdhwdhu'")
