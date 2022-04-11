import * as React from 'react';
import ResetSuccess from './ResetSuccess';
import TokenFailValidate from './TokenFailValidate';

export interface ChangeProps {
    isErrorValidate: boolean;
}
 
export interface ChangeState {
    
}
 
class Change extends React.Component<ChangeProps, ChangeState> {
    render() { 
        return (
            <div>
                {
                    this.props.isErrorValidate ?
                    <TokenFailValidate />
                    :
                    <ResetSuccess />
                }
            </div>
        );
    }
}
 
export default Change;