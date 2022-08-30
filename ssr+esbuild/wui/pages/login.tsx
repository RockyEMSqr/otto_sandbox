import { h, hydrate } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Form, Text, Password } from '@emsquared/otto_preact_form';
export const LoginPage = (p: any) => {
    const [number, setNumber] = useState(0);
    useEffect(() => {
        let id = setInterval(() => {
            setNumber(x => x + 1);
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [])
    return <div>
        <pre>{JSON.stringify(p)}</pre>
        {p.errormsg && <h1>{p.errormsg}</h1>}
        <div>{number}</div>
        <form method="POST">
            <Text label="username" value="asdf" name="username" />
            <Password label="password" value="asdfasdfasdfasdf" name="password" />
            <button>Login</button>
        </form>
    </div>
}
export default LoginPage;
if (typeof window !== 'undefined') {
    let mp = window.document.getElementById('app')!
    // render(<App />, mp);
    hydrate(<LoginPage {...window.context} />, mp)
} else {
    console.log('You are on the server')
}