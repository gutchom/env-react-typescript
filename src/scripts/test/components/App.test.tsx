import App from 'app/components/App'
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import * as assert from 'power-assert'

describe('App.tsx', () => {
  it('shallow', () => {
    const app = shallow(<App />)
    assert.strictEqual(app.contains(<h1>Hello, World!</h1>), true)
  })
  it('mount', () => {
    const app = mount(<App />)
    assert.strictEqual(app.find('input').length, 1)
  })
  it('render', () => {
    const app = render(<App />)
    assert.strictEqual(app.find('input').length, 1)
  })
})
