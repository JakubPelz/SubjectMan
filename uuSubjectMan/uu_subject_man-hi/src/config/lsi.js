const Lsi = {
  appName: {
    cs: "Aplikace uuSubject",
    en: "Application uuSubject",
  },

  left: {
    home: {
      cs: "Vítejte",
      en: "Welcome",
    },
    about: {
      cs: "O aplikaci",
      en: "About Application",
    },
    studyProgrammesList:{
      cs: "Studijní programy",
      en: "Study programmes"
    },
    subjectsList:{
      cs: "Seznam předmětů",
      en: "Subjects list"
    }
  },

  about: {
    header: {
      cs: "O aplikaci uuSubject",
      en: "About application uuSubject",
    },
    creatorsHeader: {
      cs: "Tvůrci aplikace",
      en: "Application creators",
    },
    termsOfUse: {
      cs: "Podmínky užívání",
      en: "Terms of use",
    },
  },

  bottom: {
    termsOfUse: {
      cs: "Podmínky užívání",
      en: "Terms of use",
    },
  },

  welcome:{
    cs: "Vítejte na stránkách aplikace uuSubjectMan",
    en: "Welcome to uuSubjectManApplication"
  },

  auth: {
    welcome: {
      cs: "Vítejte",
      en: "Welcome",
    },

    intro: {
      cs: `<uu5string/>Tato šablona obsahuje připravenou klientskou a serverovou část. Jednotlivé komponety, které jsou zde zobrazeny,
          jsou určeny k tomu, aby demonstrovaly možnosti a způsob použití. Je vhodné je upravit, zkopírovat či smazat pro
          potřeby vyvíjené aplikace. Více o struktuře uuApp se dozvíte v dokumetaci viz&nbsp;
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book"
            target="_blank"
            content="uuAppDevKit"
          />.`,
      en: `<uu5string/>This template consist of prepared client and server side. Shown components demonstrate possibilities and way of
          using. For application developing purposes they are suitable for modifying, copying and deleting. More about
          uuApp Structure see documentation&nbsp;
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp"
            target="_blank"
            content="uuAppDevKit"
          />.`,
    },

    clientSide: {
      cs: `<uu5string/>Klientská část je implementovaná s využitím komponent z knihoven <UU5.Bricks.LinkUU5 /> a <UU5.Bricks.LinkUuPlus4U5 />.`,
      en: `<uu5string/>Libraries <UU5.Bricks.LinkUU5/> and <UU5.Bricks.LinkUuPlus4U5 /> are used for developing of client side.`,
    },

    serverSide: {
      cs: `<uu5string/>Pro spuštení serverové části je potřeba provést inicializaci workspace podle návodu viz
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
      en: `<uu5string/>It is necessary to initialize application workspace for running server side. See manual
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
    },
  },

  unauth: {
    welcome:{
      cs: "Vítej návštěvníku",
      en: "Welcome visitor"
    },
    continueToMain: {
      cs: "Pokračovat na web produktu",
      en: "Continue to the product web",
    },
    notAuthorized: {
      cs: "Nemáte dostatečná práva k použití aplikace",
      en: "You do not have sufficient rights to use the application",
    },
  },

  unauthInit: {
    buyYourOwn: {
      cs: "Můžete si koupit vlastní uuSubject.",
      en: "You can buy your own uuSubject.",
    },
    notAuthorized: {
      cs: "Nemáte právo inicializovat tuto aplikaci uuSubject.",
      en: "You don't have rights to initialize this uuSubject.",
    },
  },

  controlPanel: {
    rightsError: {
      cs: "K zobrazení komponenty nemáte dostatečná práva.",
      en: "You do not have sufficient rights to display this component.",
    },

    btNotConnected: {
      cs: "Aplikace není napojená na Business Territory",
      en: "The application is not connected to a Business Territory",
    },
  },
};

export default Lsi;
