/* globals describe, test, afterEach, expect */
import React from 'react'
import { cleanup, render } from 'react-testing-library'

import ___titleCase___ from './___titleCase___.js'

describe('<___titleCase___ />', () => {
  afterEach(cleanup)

  test('should show prop message in the paragraph tag', () => {
    const message = 'hello new component!!'
    const { getByText } = render(<___titleCase___ message={message}></___titleCase___>)
    expect(getByText(message).innerHTML).toEqual('hello new component!!')
  })
})
