# formik相关系列文章
## 入门
安装依赖包
`yarn add formik yup --dev`

Formik跟踪表单状态，然后以props方式把此状态还有一些可重用的方法和事件处理器
（例如 handleChange，handleBlur和handleSubmit）暴露给表单组件。
其中，handleChange 和handleBlur工作方式完全一样——都使用name或者id属性来标记要更新的表单字段。

归纳来看，可以使用如下两种方式之一来使用Formik：
- withFormik()：一个高阶组件(HoC)，它接收一个配置对象作为参数；
- <Formik />：这是一个React组件，它提供了一个名称为render的属性。

上述两种方式完全一样工作，内部实现原理完全相同。只是各自在使用风格上有所不同而已。

withFormik:             
```jsx harmony
//高阶组件方式
import React from 'react';
import { withFormik } from 'formik';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
                   }) => {
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}
            <br/>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            {touched.password && errors.password && <div>{errors.password}</div>}
            <br/>
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    )
};

//使用withFormik HoC包装表单
const MyForm = withFormik({
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: '', password: '' }),
    // Add a custom validation function (this can be async too!)
    validate: (values, props) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    },
    //表单提交处理器
    handleSubmit: (
        values,
        {
            props,
            setSubmitting,
            setErrors /* setValues, setStatus, and other goodies */,
        }
    ) => {
        console.log('submit: ', values);
        // setSubmitting 可以直接改变 isSbumitting
        /*LoginToMyApp(values).then(
            user => {
                setSubmitting(false);
                // do whatevs...
                // props.updateUser(user)
            },
            errors => {
                setSubmitting(false);
                // Maybe even transform your API's errors into the same shape as Formik's!
                setErrors(transformMyApiErrors(errors));
            }
        );*/
    },
})(InnerForm);

//然后你可以在任何地方自由使用<MyForm />组件
const Basic = () => (
    <div>
        <h1>My Form</h1>
        <p>This can be anywhere in your application</p>
        <MyForm />
    </div>
);

export default Basic;
```

`<Formik />`
```jsx harmony
import React from 'react';
import { Formik } from 'formik';

const Basic = () => (
    <div>
        <h1>My Form</h1>
        <p>This can be anywhere in your application</p>
        {/*
          The benefit of the render prop approach is that you have full access to React's
          state, props, and composition model. Thus there is no need to map outer props
          to values...you can just set the initial values, and if they depend on props / state
          then--boom--you can directly access to props / state.
          The render prop accepts your inner form component, which you can define separately or inline
          totally up to you:
          - `<Formik render={props => <form>...</form>}>`
          - `<Formik component={InnerForm}>`
          - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
        */}
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={values => {
                // same as above, but feel free to move this into a class method now.
                let errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(
                values,
                { setSubmitting, setErrors /* setValues and other goodies */ }
            ) => {
                console.log('submit: ', values);
                /*LoginToMyApp(values).then(
                    user => {
                        setSubmitting(false);
                        // do whatevs...
                        // props.updateUser(user)
                    },
                    errors => {
                        setSubmitting(false);
                        // Maybe transform your API's errors into the same shape as Formik's
                        setErrors(transformMyApiErrors(errors));
                    }
                );*/
            }}
            render={({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                     }) => {
                console.log(touched);
                return (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && <div>{errors.email}</div>}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {touched.password && errors.password && <div>{errors.password}</div>}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )
            }}
        />
    </div>
);

export default Basic;
```
正你从上面观察到的，表单的校验逻辑完全由开发者自己实现。你可以心情使用第三方库来编写你自己的定制校验器。
从官方网站上了解到，示例中大量使用Yup库来实现对象的格式校验。
它提供了一种十分类似于Joi / React PropTypes的API，只不过在浏览器中尺寸十分小巧，且对运行时应用来说已经足够快。
在此建议同学们也积极使用Yup。并且在Formik中也针对Yup提供了一种特别的配置选项/属性称作validationSchema，
它能够把Yup的校验错误自动转换成一种很小的对象（对象中也提供了values和touched等键支持）。





## 参考文章
- [官方网站](https://github.com/jaredpalmer/formik)

- [使用Formik轻松开发更高质量的React表单（一）入门](http://blog.51cto.com/zhuxianzhong/2151661)
- [使用Formik轻松开发更高质量的React表单（二）使用指南](http://blog.51cto.com/zhuxianzhong/2151675)
- [使用Formik轻松开发更高质量的React表单（三）<Formik />解析](http://blog.51cto.com/zhuxianzhong/2151958)
- [使用Formik轻松开发更高质量的React表单（四）其他几个API解析](http://blog.51cto.com/zhuxianzhong/2152020)

- [Formik官方应用案例解析（一）Basics](http://blog.51cto.com/zhuxianzhong/2152543)
- [Formik官方应用案例解析（二）表单校验](http://blog.51cto.com/zhuxianzhong/2152932)
- [Formik官方应用案例解析（三）使用react-select](http://blog.51cto.com/zhuxianzhong/2153433)
- [Formik官方应用案例解析（四）组件生命周期事件](http://blog.51cto.com/zhuxianzhong/2154321)
- [Formik官方应用案例解析（ 五）React Native](http://blog.51cto.com/zhuxianzhong/2155063)
