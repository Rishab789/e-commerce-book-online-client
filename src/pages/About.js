import React from "react";

const About = () => {
  return (
    <section className="px-5 md:px-20 lg:px-20 mt-10 ">
      <div className="flex flex-col  md:flex-row lg:flex-row">
        {/* Image  */}
        <div className="overflow-hidden h-1/2 md:w-1/2 lg:w-1/2">
          <img
            src="https://htmldemo.net/koparion/koparion/img/banner/32.jpg"
            alt="About Image"
            className="w-full hover:scale-110 ease-in-out duration-200 "
          />
        </div>
        {/* Text  */}
        <div className="md:w-1/2 lg:w-1/2 px-5 ">
          <p className="text-2xl md:text-4xl lg:text-4xl rufina1 my-2">
            Why We are?
          </p>
          <p className="rufina1">
            Mellentesque faucibus dapibus dapibus. Morbi aliquam aliquet neque.
            Donec placerat dapibus sollicitudin. Morbi arcu nisi, mattis ut
            ullamcorper in, dapibus ac nunc. Cras bibendum mauris et sapien
            feugiat. scelerisque accumsan nibh gravida. Quisque aliquet justo
            elementum lectus ultrices bibendum.
          </p>
          <ul className="rufina1">
            <li>✔️Iconncredible design</li>
            <li>✔️Icon well organized & SEO optimized friendy</li>
            <li>✔️Powerfull admin panel</li>
            <li>✔️HTML & CSS3 build with bootstrap</li>
            <li>✔️Amazing wordpress theme</li>
          </ul>
        </div>
      </div>

      {/* second section  */}
      <div className="grid md:grid-cols-3 lg:grid-cols-3 my-20  gap-5">
        <div>
          <p className="text-4xl rufina1">Why We do?</p>
          <p className="rufina1">
            Huis nostrud exerci tation ullamcorper suscipites lobortis nisl ut
            aliquip ex ea commodo consequat. Investigationes demonstraverunt
            lectores legere me lius quod ii legunt saepius claritas.
          </p>
        </div>
        <div>
          <p className="text-4xl rufina1">Our Mission</p>
          <p className="rufina1">
            Huis nostrud exerci tation ullamcorper suscipites lobortis nisl ut
            aliquip ex ea commodo consequat. Investigationes demonstraverunt
            lectores legere me lius quod ii legunt saepius claritas.
          </p>
        </div>
        <div>
          <p className="text-4xl rufina1">Our Vision</p>
          <p className="rufina1">
            Puis nostrud exerci tation ullamcorper suscipito lobortis nisl ut
            aliquip ex ea commodo consequat. Investigationes demonstraverunt
            lectores legere me lius quod ii legunt saepius claritas.
          </p>
        </div>
      </div>

      {/* Third Countdown Section  */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 my-20">
        <div className="text-center rufina1 ">
          <p className="text-4xl">0</p>
          <p className="text-xl">Order Completed</p>
        </div>
        <div className="text-center rufina1">
          <p className="text-4xl">0</p>
          <p className="text-xl">Happy Customers</p>
        </div>
        <div className="text-center rufina1">
          <p className="text-4xl">0</p>
          <p className="text-xl">Revenue</p>
        </div>
        <div className="text-center rufina1">
          <p className="text-4xl">0</p>
          <p className="text-xl">Profit</p>
        </div>
      </div>

      {/* Fourth section our Team */}
      <div className="grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 my-20 gap-5 text-center rufina1">
        <div>
          <img src="https://htmldemo.net/koparion/koparion/img/team/1.jpg" />
          <p className="text-2xl">Amish Gupta</p>
          <p>Marketer</p>
        </div>
        <div>
          <img src="https://htmldemo.net/koparion/koparion/img/team/2.jpg" />
          <p className="text-2xl">Harish Samay</p>
          <p>Sales</p>
        </div>
        <div>
          <img src="https://htmldemo.net/koparion/koparion/img/team/3.jpg" />
          <p className="text-2xl">Janim Nath</p>
          <p>CTO</p>
        </div>
        <div>
          <img src="https://htmldemo.net/koparion/koparion/img/team/4.jpg" />
          <p className="text-2xl">Samay Raina</p>
          <p>CEO</p>
        </div>
      </div>
    </section>
  );
};

export default About;
