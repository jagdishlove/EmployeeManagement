import {render,screen} from '@testing-library/react';
import {rest} from "msw";
import { Provider } from 'react-redux';
import store from "../../redux/store/store";
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
//import theme from './logintheme'
import { createTheme } from '@mui/material/styles';
import { fireEvent,waitFor } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import axios from 'axios';
import {server} from '../../mocks/server';

import LoginForm from './loginForm';
import Login from './login';
import { createStore } from 'redux'
import loginReducer from '../../redux/reducers/loginReducer'

jest.mock('axios');
describe("Login Component Test cases",() => {
    test('Login renders correctly',() =>{
        const store = createStore(loginReducer)
        const theme = createTheme({
            palette: {
                lightGray: {
                main: '#e0e0e0', // Replace this with your desired light gray color
                },
                // Other palette configurations...
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                <ThemeProvider theme={theme}>
                <Login/>
                </ThemeProvider>
                </MemoryRouter>
            </Provider>
            );
        const mantraTextElement = screen.getByText('THE PRAKAT MANTRAS');
        expect(mantraTextElement).toBeInTheDocument();
    });
    test('username and password field should be updated with new value',async() =>{
        const store = createStore(loginReducer)
        const theme = createTheme({
            palette: {
                lightGray: {
                main: '#e0e0e0', // Replace this with your desired light gray color
                },
                // Other palette configurations...
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                <ThemeProvider theme={theme}>
                <Login/>
                </ThemeProvider>
                </MemoryRouter>
            </Provider>
            );
        
            const pwdTextElement = screen.getByText('Forgot Password?');
            const button = screen.getByRole('button',{name: 'Sign In'});
            // const emailInput = screen.getByRole("textbox",{name:'Email'});
            //const emailInput = screen.getByDisplayValue('textbox',{name:'email'});
            // const emailInput = screen.getByRole('textbox',{name:'Email'});
            // const passwordInput = screen.getByRole('textbox',{name:'Password'});
            const emailInput = screen.getByLabelText("Email"); 
            const passwordInput = screen.getByLabelText("Password"); 
            //expect(pwdTextElement).toBeInTheDocument();
            //expect(emailInput.value).toBe("");
            // Simulate user input
            fireEvent.change(emailInput, { target: { value: "lawori4081@weizixu.com" } });
            fireEvent.change(passwordInput, { target: { value: "testing12345" } });  
            //fireEvent.click(button);      
            expect(emailInput.value).toBe("lawori4081@weizixu.com");
            expect(passwordInput.value).toBe("testing12345");
            //fireEvent.click(button);

            // await waitFor(() => {
            //     expect(pwdTextElement).not.toBeInTheDocument();
            // });

            

    // // Wait for DOM update after the click event
    // await screen.findByText('Forgot Password?', { exact: false });

    // Check if "Forgot Password?" is not in the document after form submission
    //expect(screen.queryByText('Forgot Password?', { exact: true })).not.toBeInTheDocument();

        

    });

    /*test('On clicking SignIn, displays Sidebar page ',async() =>{
       
        //     const mockResponseData = {id:1,name: 'Arc Tutorial', username: 'arctutorials'};
        //     axios.get.mockResolvedValueOnce({data:mockResponseData});
        //     const user = await getUserData(1);
        // expect(user).toEqual(mockResponseData);
        
        const theme = createTheme({
            palette: {
                lightGray: {
                main: '#e0e0e0', // Replace this with your desired light gray color
                },
                // Other palette configurations...
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                <ThemeProvider theme={theme}>
                <Login/>
                </ThemeProvider>
                </MemoryRouter>
            </Provider>
            );
        const sidebarListItems = await screen.findAllByRole("list");
        expect(sidebarListItems).toHaveLength(3);

    });*/

    

    test('Invalid credentials, login page should be displayed again ',async() =>{
        const store = createStore(loginReducer)
        //     const mockResponseData = {id:1,name: 'Arc Tutorial', username: 'arctutorials'};
        //     axios.get.mockResolvedValueOnce({data:mockResponseData});
        //     const user = await getUserData(1);
        // expect(user).toEqual(mockResponseData);
        server.use(
            rest.get(
                "http://167.71.233.53:8080/projectx/auth/authenticate",
                (req,res,ctx) => {
                    return res(ctx.status(500));
                }
            )
        );
        
        const theme = createTheme({
            palette: {
                lightGray: {
                main: '#e0e0e0', // Replace this with your desired light gray color
                },
                // Other palette configurations...
            },
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                <ThemeProvider theme={theme}>
                <Login/>
                </ThemeProvider>
                </MemoryRouter>
            </Provider>
            );
        // const sidebarListItems = await screen.findAllByRole("listitem");
        // expect(sidebarListItems).not.toBeInTheDocument();

        // Wait for DOM update after the click event
    await screen.findByText('Forgot Password?', { exact: false });

    // Check if "Forgot Password?" is not in the document after form submission
    expect(screen.queryByText('Forgot Password?', { exact: false })).toBeInTheDocument();

    });
});

