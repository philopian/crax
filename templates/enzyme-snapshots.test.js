/* globals describe, it, expect */
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import ___titleCase___ from './___titleCase___.js'

describe('___titleCase___ (Snapshot)', () => {
  it('___titleCase___ renders without crashing', () => {
    const component = renderer.create(<___titleCase___ />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})

describe('___titleCase___', () => {
  it('should show prop message in the paragraph tag', () => {
    const component = mount(<___titleCase___ message='hello jest/enzyme' />)
    const actual = component.find('p').text()
    const expected = 'hello jest/enzyme'
    expect(actual).toEqual(expected)
  })
})
