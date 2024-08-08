
export default emailPassword = (name,userName, password, pin = 0) => {
  return `<style>
  @import url("https://fonts.googleapis.com/css?family=Questrial");
  @media (max-width: 576px) {
    .container {
      width: 90%;
    }
  }
  @media (max-width: 576px) {
    .inner-box {
      padding: 1.5rem;
    }
  }
  @media (max-width: 576px) {
    .btn-box {
      margin: 2rem;
    }
  }
</style>

<div class="body" style="font-family: 'Questrial', sans-serif;">
  <div class="main-box" style="background: #f8f8f8; padding: 2rem 0 5rem 0;">
    <div class="container" style="margin: auto; width: 60%;">
      <img
        src="https://cdn.techinasia.com/data/images/hqw58hc1cQ2NicTVy9MNHcTDegW0kfbimNLllIgA.jpeg"
        alt="Kefir"
        class="logo"
        style="height: 40px; margin-bottom: 1rem;"
        height="40"
      />
      <div
        class="inner-box"
        style="background: #fff; padding: 2rem; border-radius: 5px;"
      >
        <p>Hi ${name},</p>
        Hi, this is your account's Backoffice B2c please keep this CAREFULLY, 
        <div class="" style="text-align: left; margin: 0.5rem;" disabled>
           <a href="" style="cursor: pointer;">
            <button
              style="padding: 0.5rem 2rem; border: none; border-radius: 3px;  color: #000;" disabled>
              user name : ${userName}
            </button>
          </a>
        </div>
        <div class="" style="text-align: left; margin: 0.5rem;" disabled>
           <a href="" style="cursor: pointer;">
            <button
              style="padding: 0.5rem 2rem; border: none; border-radius: 3px;  color: #000;" disabled>
              password : ${password}
            </button>
          </a>
        </div>
        <div class="" style="text-align: left; margin: 0.5rem;" disabled>
           <a href="" style="cursor: pointer;">
            <button
              style="padding: 0.5rem 2rem; border: none; border-radius: 3px; color: #000;" disabled>
              pin : ${pin}
            </button>
          </a>
        </div>
        <p>Thanks in advance</p>
        <p>&mdash; The Kefir Team &mdash;</p>
      </div>
    </div>
  </div>
</div>
        `
}
