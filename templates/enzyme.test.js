/* globals describe, test, expect */
import React from 'react'
import { mount } from 'enzyme'
import ___titleCase___ from './___titleCase___.js'

describe('<___titleCase___ />', () => {
  test('should show prop message in the paragraph tag', () => {
    const component = mount(<___titleCase___ message='hello jest/enzyme' />)
    const actual = component.find('p').text()
    const expected = 'hello jest/enzyme'
    expect(actual).toEqual(expected)
  })
})
