import {render,screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import SignUp from './Signup'
import Store from '../../Store/main'
test('Should Conatain Email',()=>{
    render(<Provider store={Store}>
        <SignUp/>
    </Provider>)
    const Email = screen.getAllByPlaceholderText("Enter Your E-Mail Id",{exact:true})
    expect(Email).toBeInTheDocument()
})