import { useForm } from "react-hook-form";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data.foto);
    alert('enviando datos')
    reset()
  });
  return (
    <div className="formulario">
      <h1 className="tex">React Hook Form</h1>
      <form onSubmit={onSubmit} >
        {/* name */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("nombre", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 3,
              message: "Este campo debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 15,
              message: "Este campo debe tener menos de 15 caracteres",
            },
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
        {/* Email */}
        <label htmlFor="email"> Email</label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "El email no es valido",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        {/* Password */}
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 8,
              message: "Este campo debe tener al menos 8 caracteres",
            }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        {/* confitmat password */}
        <label htmlFor="confirmarPassword">Confirmar Password</label>
        <input
          type="password"
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            validate: (value) => {
              return value === watch("password")
                ? true
                : "Las contraseñas no coinciden";
            },
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}
        {/* fecha nacimiento */}
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          {...register("fechaNacimiento", {
            required: {
              value: true,
              message: "Fecha de nacimiento es requerida",
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear();
              return edad >= 18 ? true : "Debes ser mayor de edad";
            },
          })}
        />
        {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}
        {/*country*/}
        <label htmlFor="country">Country</label>
        <select {...register("country")}>
          <option value="col">Colombia</option>
          <option value="mex">Mexico</option>
          <option value="per">Peru</option>
          <option value="usa">USA</option>
        </select>
          {
            watch('country') === 'mex' && (
            <>
              <input type="text" {...register("ciudad",{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
      
              }
      
              )} />
              {errors.ciudad && <span>{errors.ciudad.message}</span>}
            </>
            )
          }
        {/*file*/}
        <label htmlFor="foto">Foto de perfil</label>
        <input type="file" onChange={(e)=>{
          console.log(e.target.files[0])
          setValue('fotoDelUsuario', e.target.files[0].name)
        }} />

        {/* terms  */}
       
        <div className="checkbox-wrapper ">
          <div className="hola">
            <input
                className="in"
                type="checkbox"
                {...register("terms", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  }
                })}
              />
          </div>
            <label 
            className="lab"
            htmlFor="terms">
          
          
              Acepto terminos 
          
            </label>
        </div>
          {errors.terms && <span className="sp">{errors.terms.message}</span>}
          
   
        <button type="submit">Enviar</button>
      </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
}

export default App;
