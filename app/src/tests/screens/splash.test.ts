import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'

import { Splash } from '../../screens/Splash'

test('examples of some things', async () => {
    const renderized  = render(Splash as any).toJSON()
    expect(screen.toJSON()).toMatchSnapshot()
  })