import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { shallowToJson } from 'enzyme-to-json';

import Alert from '../../../components/alert.js';

describe("alert", () => {
  describe("alert msg ", () => {
    it("should display the name of the category", () => {
      const alert = shallow(<Alert alertType={"alert-success"} alertMsg={"A message to test testing"}/>)
      const alertMsg = alert.find('div').text();
      expect(alertMsg).toEqual('A message to test testing')
    })

    it("renders properly", () => {
      const alert = shallow(<Alert alertType={"alert-success"} alertMsg={"A message to test testing"}/>)
      expect(shallowToJson(alert)).toMatchSnapshot();
    })

    it("has a function to hide alert", () => {
      const alert = shallow(<Alert alertType={"alert-success"} alertMsg={"A message to test testing"}/>)

      alert.setProps({hideAlert: jest.fn()})

      expect(alert.instance().hide());
    })
  })
})
