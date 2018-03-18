import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Alert from '../../../components/alert.js';

describe("category module", () => {
  describe("the name of the category to display", () => {
    it("should display the name of the category", () => {
      const alert = shallow(<Alert alertType={"alert-success"} alertMsg={"A message to test testing"}/>)
      const alertMsg = alert.find('div').text();
      expect(alertMsg).toEqual('A message to test testing fail')
    })
  })
})
