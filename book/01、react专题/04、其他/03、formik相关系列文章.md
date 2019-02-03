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


## 使用指南

### 一个基本的例子
设想你要开发一个可以编辑用户数据的表单。不过，你的用户API端使用了具有类似下面的嵌套对象表达
```
{
   id: string,
   email: string,
   social: {
     facebook: string,
     twitter: string,
     // ...
   }
}
```
最后，我们想使开发的对话框表单能够接收下面几个属性（props）：
user，updateUser和onClose（显然，user是一个对象，updateUser和onClose却都是两个方法）。
```jsx harmony
import React from 'react';
import {Formik} from 'formik';

const EditUserDialog = ({user, updateUser, onClose}) => {
    return (
        <div onClose={onClose}>
            <h1>Edit User</h1>
            <Formik
                initialValues={user /** { email, social } */}
                onSubmit={(values, actions) => {
                    console.log(values);
                    // console.log(actions);
                    /*CallMyApi(user.id, values).then(
                        updatedUser => {
                            actions.setSubmitting(false);
                            updateUser(updatedUser);
                            onClose();
                        },
                        error => {
                            actions.setSubmitting(false);
                            actions.setErrors(transformMyAPIErrorToAnObject(error));
                        }
                    );*/
                    setTimeout(()=> {
                        actions.setSubmitting(false)
                    }, 2000)
                }}
                render={({
                             values,
                             errors,
                             touched,
                             handleBlur,
                             handleChange,
                             handleSubmit,
                             isSubmitting,
                         }) => {
                    console.log(isSubmitting);
                    return (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.id}
                            />
                            {errors.id && touched.id && <div>{errors.id}</div>}
                            <br/>
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && <div>{errors.email}</div>}
                            <br/>
                            <input
                                type="text"
                                name="social.facebook"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.social.facebook}
                            />
                            {errors.social &&
                            errors.social.facebook &&
                            touched.facebook && <div>{errors.social.facebook}</div>}
                            <br/>
                            <input
                                type="text"
                                name="social.twitter"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.social.twitter}
                            />
                            {errors.social &&
                            errors.social.twitter &&
                            touched.twitter && <div>{errors.social.twitter}</div>}
                            <br/>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )
                }}
            />
        </div>
    );
};


class Test extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                email: '',
                social: {
                    facebook: '',
                    twitter: '',
                }
            }
        }
    };

    handleUpdateUser = (user) => {
        this.setState({
            user
        })
    };

    render() {
        console.log(this.state.user);
        return (
            <div>
                {EditUserDialog({
                    user: this.state.user,
                    updateUser: this.handleUpdateUser
                })}
            </div>
        )
    }
}
export default Test;
```

### 简化编码
为了简化表单组件的编码，Formik还提供了两个帮助API：  
- <Field>
- <Form />
于是，下面的代码与前面一致，只是使用<Form />和<Field />这两个API进行了改写：
```jsx harmony
import React from 'react';
import {Field, Form, Formik} from 'formik';

const EditUserDialog = ({user, updateUser, onClose}) => {
    return (
        <div onClose={onClose}>
            <h1>Edit User</h1>
            <Formik
                initialValues={user /** { email, social } */}
                onSubmit={(values, actions) => {
                    console.log(values);
                    setTimeout(()=> actions.setSubmitting(false), 2000);
                    /*CallMyApi(user.id, values).then(
                        updatedUser => {
                            actions.setSubmitting(false);
                            updateUser(updatedUser), onClose();
                        },
                        error => {
                            actions.setSubmitting(false);
                            actions.setErrors(transformMyAPIErrorToAnObject(error));
                        }
                    );*/
                }}
                render={({errors, touched, isSubmitting}) => (
                    <Form>
                        <Field type="id" name="id"/>
                        {errors.id && <div>{errors.id}</div>} <br/>
                        <Field type="text" name="email"/>
                        {errors.email && touched.email && <div>{errors.email}</div>} <br/>
                        <Field type="text" name="social.facebook"/>
                        {errors.social && errors.social.facebook &&
                        touched.facebook && <div>{errors.social.facebook}</div>} <br/>
                        <Field type="text" name="social.twitter"/>
                        {errors.social && errors.social.twitter &&
                        touched.social.twitter && <div>{errors.social.twitter}</div>} <br/>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            />
        </div>
    );
};

class Test extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                email: '',
                social: {
                    facebook: '',
                    twitter: '',
                }
            }
        }
    };

    handleUpdateUser = (user) => {
        this.setState({
            user
        })
    };

    render() {
        console.log(this.state.user);
        return (
            <div>
                {EditUserDialog({
                    user: this.state.user,
                    updateUser: this.handleUpdateUser
                })}
            </div>
        )
    }
}

export default Test;
```


Formik是使用TypeScript写的，Formik中的类型十分类似于React Router 4中的<Route>。
```jsx harmony
import * as React from 'react';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';

interface MyFormValues {
  firstName: string;
}

export const MyApp: React.SFC<{} /* whatever */> = () => {
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={{ firstName: '' }}
        onSubmit={(values: MyFormValues) => alert(JSON.stringify(values))}
        render={(formikBag: FormikProps<MyFormValues>) => (
          <Form>
            <Field
              name="firstName"
              render={({ field, form }: FieldProps<MyFormValues>) => (
                <div>
                  <input type="text" {...field} placeholder="First Name" />
                  {form.touched.firstName &&
                    form.errors.firstName &&
                    form.errors.firstName}
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
};
```

### formik表单提交原理
要在Formik中提交表单，你需要以某种方式触发 handleSubmit(e) 或者submitForm属性调用（在Formik中这两个方法都是以属性的方式提供的）。
当调用其中一个方法时，Formik每次都会执行下面的伪代码：

- （一）预提交
    - （1）修改所有字段
    - （2）把isSubmitting 设置为true
    - （3）submitCount + 1
- （二）校验
    - （1）把isValidating设置为true
    - （2）异步运行所有字段级的校验和validationSchema，并深度合并执行结果
    - （3）判断是否存在错误：                              
        如果存在错误：取消提交，把isValidating设置为false，设置错误信息，并把isSubmitting设置为false
        如果不存在错误：Set isValidating to false, proceed to "Submission"
        
- （三）提交                                 
最后继续运行你的提交函数吧（例如是onSubmit或者handleSubmit）。你可以通过在你的处理器函数中调用setSubmitting(false) 来结束生命周期。


### 常用api
#### Formik的api

**`<Formik/>`**这个API共提供了三种渲染方法，它们是：                          
- <Formik component>
- <Formik render>
- <Formik children>


**Formik props列表分析**                            
- dirty: boolean                        
当values与初始值不绝对相等时这个属性的值会返回true；否则返回false                

- errors: { [field: string]: string }   
- handleBlur: (e: any) => void
- handleChange: (e: React.ChangeEvent<any>) => void
- handleReset: () => void
- handleSubmit: (e: React.FormEvent<HTMLFormEvent>) => void
- isSubmitting: boolean
- isValid: boolean                      
在不发生错误的情况下这个属性值将为true；或者返回当表单处于pristine条件（例如没有dirty）时会返回isInitialValid的结果值。
- isValidating: boolean
- resetForm: (nextValues?: Values) => void
强行复位表单。这个调用会清除所有错误及字段「润色」信息，并且设置isSubmitting为false，设置isValidating为false，并且把mapPropsToValues返回值设置为当前的WrappedComponent的props或者是传递过去的参数。
- setErrors: (fields: { [field: string]: string }) => void
- setFieldError: (field: string, errorMsg: string) => void
- setFieldTouched: (field: string, isTouched: boolean, shouldValidate?: boolean) => void
- submitForm: () => void
- submitCount: number
- setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
- setStatus: (status?: any) => void
- setSubmitting: (isSubmitting: boolean) => void
- setTouched: (fields: { [field: string]: boolean }) => void
- setValues: (fields: { [field: string]: any }) => void
- status?: any
- touched: { [field: string]: boolean }
此属性用于润色表单中对应的字段值。每一个键都相应于一个刚刚被「动过」（touched）或者访问过的字段。
- values: { [field: string]: any }
- validateForm: (values?: any) => void
- validateField: (field: string) => void


**component**:                      
下面给出此属性的典型使用方法：
```jsx harmony
<Formik component={ContactForm} />;
const ContactForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.name}
      name="name"
    />
    {errors.name && <div>{errors.name}</div>}
    <button type="submit">Submit</button>
  </form>;
};
```
- render: (props: FormikProps<Values>) => ReactNode
- children: func
- enableReinitialize?: boolean
默认值为false。此属性用于在initialValues变化时控制是否重置表单。
- isInitialValid?: boolean
- initialValues?: Values
- onReset?: (values: Values, formikBag: FormikBag) => void
- onSubmit: (values: Values, formikBag: FormikBag) => void
- validate?: (values: Values) => FormikErrors<Values> | Promise<any>
- validateOnBlur?: boolean
- validateOnChange?: boolean
- validationSchema?: Schema | (() => Schema)





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
