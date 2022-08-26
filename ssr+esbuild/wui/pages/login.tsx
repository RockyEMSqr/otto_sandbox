import { h } from 'preact';
import { Form, Text, Password } from '@emsquared/otto_preact_form';
export const LoginPage = (p:any) => {
    return <div>
        <pre>{JSON.stringify(p)}</pre>
        {p.errormsg && <h1>{p.errormsg}</h1>}
        <form method="POST">
            <Text label="username" value="asdf" name="username" />
            <Password label="password" value="asdfasdfasdfasdf" name="password" />
            <button>Login</button>
        </form>
    </div>
}
export default LoginPage;