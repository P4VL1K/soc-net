import { Params, useParams,} from "react-router-dom";
import React, {ComponentType} from "react";

export function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T & WithRouterType) {
        let {params} = useParams();
        return (
            <Component
                {...props}
                router={ params }
            />
        );
    }
    return ComponentWithRouterProp;
}

type WithRouterType = Readonly<Params<string>>;
