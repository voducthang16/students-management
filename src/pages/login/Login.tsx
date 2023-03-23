import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { localStorageMethod } from 'utils';
function Login() {
    return (
        <div className="h-screen bg-blue-300 flex items-center justify-center">
            <div className="w-60">
                <LoginSocialGoogle
                    client_id="537267212246-aaelv3v3j40f6au9km4hgqffcju14nga.apps.googleusercontent.com"
                    onResolve={({ provider, data }) => {
                        localStorageMethod.set('login', data!);
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                >
                    <GoogleLoginButton />
                </LoginSocialGoogle>
            </div>
        </div>
    );
}

export default Login;
