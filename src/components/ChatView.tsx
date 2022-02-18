import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../state";
import AvatarIcon from "./AvatarIcon";
import Icon from "./Icon";

const mapStateToProps = (state: AppState) => {
  return { CurrentChat: state.CurrentChat };
};
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface props extends PropsFromRedux {
  className?: string;
}

function ChatView({ className = "", CurrentChat }: props) {
  const [viewMemberList, setViewMemberList] = useState(false);

  return (
    <div className={className}>
      <div className="z-[2] flex h-12 flex-none items-center px-2 shadow-low-elevation">
        <div className="mx-2 text-muted">
          <Icon.Alias />
        </div>
        <div className="font-display font-semibold text-header-primary">
          {CurrentChat?.participants.join(", ")}
        </div>
        <div className="ml-auto flex">
          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.AudioCall />
          </div>
          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.VideoCall />
          </div>
          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.Pin />
          </div>

          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.AddMember />
          </div>
          {CurrentChat && CurrentChat?.participants.length > 1 && (
            <div
              className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover"
              onClick={() => setViewMemberList(!viewMemberList)}
            >
              <Icon.Members />
            </div>
          )}
          <div className="mx-2 flex text-normal">
            <input
              className="h-6 w-[7.25rem] flex-1 rounded-l bg-tertiary pl-[0.375rem] font-primary text-sm font-medium leading-5 outline-none transition-[width] duration-[250ms] placeholder:text-muted focus:w-[13.25rem] placeholder-not-shown:w-[13.25rem]"
              placeholder="Search"
              type="text"
            />
            <div className="flex h-6 w-7 cursor-text items-center justify-center rounded-r bg-tertiary px-[0.125rem] text-muted">
              <Icon.MagnifyingGlass />
            </div>
          </div>
          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.DMInbox />
          </div>
          <div className="mx-2 cursor-pointer text-interactive-normal hover:text-interactive-hover">
            <Icon.Help />
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col-reverse overflow-y-scroll -webkit-scrollbar:h-4 -webkit-scrollbar:w-4 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:rounded-lg -webkit-scrollbar-thumb:border-4 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-tertiary -webkit-scrollbar-thumb:bg-clip-padding -webkit-scrollbar-track:rounded-lg -webkit-scrollbar-track:border-4 -webkit-scrollbar-track:border-solid -webkit-scrollbar-track:border-transparent -webkit-scrollbar-track:bg-scrollbar-auto-track -webkit-scrollbar-track:bg-clip-padding">
            <p className="my-16 w-full px-24 text-center font-primary text-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id
              vitae at voluptates tenetur incidunt, eum consequatur veniam natus
              aliquam illo consequuntur, dolor aspernatur commodi qui, impedit
              cupiditate doloribus ipsum. Dolores saepe sunt totam, quia dolorem
              deserunt quasi dolorum numquam vel nesciunt molestiae dolore iusto
              magni aspernatur libero quod accusamus. Laboriosam quaerat
              voluptatibus, nisi corporis veritatis harum cupiditate temporibus
              dicta! Corrupti iste nobis excepturi eos doloribus doloremque
              mollitia unde omnis consequatur maxime, aspernatur necessitatibus
              quisquam officiis cupiditate quas! Voluptas odio consequuntur esse
              voluptatibus voluptatem quia facere error quod quasi earum? Fugiat
              aperiam sed expedita minima nulla officia omnis ratione quo
              itaque, sapiente sequi voluptatem adipisci quaerat eveniet
              molestiae porro nihil quod, natus doloremque tempora quos laborum
              culpa neque molestias? Amet? Quisquam iste recusandae praesentium
              nihil autem vero consequuntur libero nulla rerum qui asperiores
              ipsa accusantium sequi similique, veniam sapiente reiciendis a
              optio voluptas necessitatibus cum dolores in? Id, ut quia. Est
              veniam nobis non voluptatibus beatae aspernatur assumenda,
              repudiandae in, corporis minus facere voluptatum? Ab inventore,
              saepe non maxime distinctio neque voluptate esse optio
              perspiciatis quis voluptates doloribus laborum iure. Obcaecati
              similique qui modi debitis porro eaque unde mollitia fugiat!
              Dolores veritatis, sapiente illum velit, omnis eos quaerat,
              aliquid laborum dignissimos repudiandae expedita. Quidem
              perspiciatis vitae esse, accusamus dolorem est. Alias impedit,
              nisi repellendus id quam fuga odit pariatur optio doloremque
              dignissimos, dicta quod molestiae soluta? Eligendi dolorum ad
              culpa sint? Architecto blanditiis quidem consequatur
              exercitationem quo adipisci quisquam nemo. Totam adipisci dolore
              est culpa, voluptas labore, laboriosam facilis rerum obcaecati
              itaque harum sed cumque fugiat fugit minus officiis at fuga odit
              sequi eaque aliquid qui quos nulla. Reprehenderit, eos. Adipisci
              beatae atque sapiente incidunt odit qui, facilis magni repellat
              sed ullam consequatur dicta saepe natus at itaque ex voluptatem
              eum dolore nesciunt ipsam necessitatibus numquam blanditiis.
              Architecto, consequuntur sit. Animi libero iure reiciendis
              doloribus, molestias laboriosam reprehenderit quibusdam architecto
              possimus expedita sequi, beatae voluptatem provident! Repellat
              magnam, natus, omnis harum modi est, deleniti repudiandae et
              perferendis similique facilis quam. Animi, delectus. Quaerat,
              praesentium. Deserunt nesciunt deleniti possimus dicta suscipit,
              ullam est. Laudantium odit, veniam nesciunt ea suscipit rem
              repellat a quasi tempora aperiam aliquid incidunt eius dicta ullam
              illo. Debitis et sint maxime perspiciatis, nemo ab, eveniet
              laboriosam laudantium similique in, accusamus sunt dolor assumenda
              quae deserunt iure harum praesentium pariatur fugit nihil veniam.
              Beatae fugit repellat tenetur veritatis! Atque aliquam rerum quis
              ad eius voluptas facere similique fugit hic esse dolorum, delectus
              commodi. Nesciunt eum possimus magni qui labore iusto dolor, natus
              praesentium incidunt, recusandae suscipit! Fugiat, inventore. Ad
              non perspiciatis a sint at blanditiis tempore nesciunt pariatur
              ratione. Alias, odit modi, delectus ad minima libero nostrum saepe
              rerum consectetur error eaque doloremque eos dolores aliquam quos
              obcaecati. Illum ex, dicta enim laborum voluptatum cum dolorem
              odio nemo est qui id commodi velit repellat accusantium in impedit
              omnis aliquam sit ea, neque pariatur. Accusantium culpa incidunt
              commodi corrupti. Corrupti, omnis unde in iure minima eaque culpa
              soluta fuga ratione animi veritatis suscipit eligendi magni magnam
              quae ullam voluptatibus excepturi praesentium deleniti? Ab
              obcaecati porro blanditiis esse alias. Eius! Cupiditate, hic.
              Consectetur saepe maxime, molestiae dolores autem, eligendi
              placeat libero possimus asperiores voluptate deserunt quam nam at
              sint ducimus voluptates repudiandae ut adipisci ipsam itaque!
              Corrupti cupiditate exercitationem minima? Assumenda, fugit
              provident dolor maxime porro esse unde quidem aliquam? Praesentium
              dignissimos quas perferendis incidunt ipsa dolorem. Aperiam vero
              cum ipsa labore excepturi recusandae architecto, illo delectus
              iste perferendis totam. Debitis accusantium consequuntur quisquam,
              modi excepturi ut quos, dicta cum quae architecto quo maxime.
              Ratione earum eaque aut dignissimos! Fuga provident excepturi
              praesentium dolore. Illum rerum quos esse expedita similique.
              Similique numquam accusantium maiores dicta? Atque minima fuga
              explicabo! Sit ab, corporis placeat nihil consequatur fugit atque
              expedita dicta ipsa quis distinctio sint? Exercitationem suscipit
              voluptatibus dolore, quisquam distinctio saepe! Voluptas, ipsam.
              Perspiciatis, nemo aspernatur. Similique quos nulla atque
              laboriosam accusantium tempore facilis sed molestiae ratione
              architecto, iure voluptas consequuntur deleniti expedita explicabo
              ducimus illo quaerat dolore vero, numquam repudiandae? Veniam
              reprehenderit deserunt perferendis beatae odit facilis sint
              pariatur, necessitatibus maxime tempore minima unde mollitia ullam
              illum ipsa velit, dignissimos iusto error modi! Natus, ad
              blanditiis non porro officiis modi? Magni sed rem vel quasi.
              Molestiae nemo ab beatae, ea perferendis necessitatibus! In,
              veniam et eveniet voluptatibus neque accusantium delectus
              molestias nobis ratione, nemo magni, saepe laborum quasi
              asperiores non? Blanditiis deleniti soluta harum, maiores dicta
              iste optio, vel natus laudantium eligendi neque. Labore, dolor
              eaque fuga laboriosam vel facere saepe expedita velit nobis
              perferendis excepturi recusandae numquam iste quisquam. Temporibus
              dignissimos quo labore voluptas inventore eaque harum, magnam
              expedita hic, similique, accusamus beatae? Consequuntur, ad
              accusamus! Quae quis explicabo molestiae pariatur dolorem! Totam,
              aperiam molestiae! Aliquam aspernatur accusantium obcaecati!
              Nesciunt reiciendis ipsum rerum itaque molestias quos at nostrum
              explicabo? Magnam dolore veritatis earum ad aut incidunt, atque,
              tempora inventore repudiandae, recusandae fuga mollitia molestias
              dolor est fugiat explicabo alias. Excepturi, consectetur corrupti
              voluptatem consequuntur minus molestias repellendus in, tempora
              quos veniam eaque quia! Eveniet amet nam in aut consectetur
              pariatur eius ad laboriosam? Voluptas cum voluptate pariatur
              facere placeat. Enim ratione, placeat molestias tempora optio
              adipisci aliquid iste, magnam dignissimos doloribus perspiciatis
              dolor quidem recusandae quaerat reprehenderit sint incidunt. Quod
              consequuntur deserunt dolores maiores illo, voluptatum consequatur
              reprehenderit porro. Doloribus illum omnis amet similique
              temporibus in eveniet accusamus rerum. Nesciunt impedit, iusto non
              aliquam officiis quo, odit est esse, dolorum a id dolorem! Esse
              nostrum maiores itaque ratione pariatur? Minima odio non vel illo
              sapiente inventore obcaecati esse maxime fugit. Hic dolores
              accusamus eaque, ut cum veniam accusantium sunt saepe dignissimos
              illo reprehenderit dicta perspiciatis iusto animi, nihil
              voluptate. Quod magni itaque quas ex a laudantium illum quae, sed
              magnam amet facere. Corrupti nemo culpa, ipsum ea nihil magnam,
              dolorum dolor beatae officia facilis harum, esse distinctio!
              Natus, hic? Quaerat saepe eos reprehenderit velit error eum
              nesciunt facere! Ratione, labore facilis? Numquam odit culpa
              facilis, vel, corrupti asperiores quisquam voluptatibus doloremque
              architecto quos deleniti itaque ullam dolore, esse accusamus?
              Consectetur quae, quo tempore maxime ab quis odit sapiente,
              consequatur officia molestias itaque necessitatibus ut voluptate
              mollitia voluptatem nulla officiis? Consequuntur laboriosam optio
              aliquid vitae delectus tempora eaque cumque est? Quidem,
              doloremque? Iure provident quaerat suscipit aliquid consequuntur
              enim facilis sapiente repellat! Nihil veniam natus eum quas rem
              laboriosam voluptas iste consequatur, ipsa non, vitae, suscipit
              vel nam minima deserunt! Modi, culpa pariatur. Ad, doloremque odio
              quaerat animi libero consequuntur. Nisi esse facilis quisquam
              totam ab. Facere, ratione rerum explicabo dolorem cupiditate
              itaque ea quos autem hic maiores, voluptates doloribus. Fugiat
              tenetur officiis saepe repellendus nobis odio veniam. Quas culpa
              earum, ipsa eos commodi exercitationem ullam mollitia cumque
              tempora quia facere porro quod veritatis sequi aut explicabo totam
              possimus rem. Animi, minus reprehenderit! Alias laborum sint eaque
              culpa. Dignissimos delectus minus in quam quasi molestias fugiat
              eum sapiente esse corporis ab maiores quis cupiditate eveniet
              molestiae error, praesentium cumque dicta. Eius facilis modi
              eveniet. Laboriosam at quis unde, autem, error optio porro
              eligendi minus ullam quos necessitatibus deserunt doloremque quia
              pariatur ratione? Eligendi ullam quod laborum quis, natus
              laboriosam recusandae. Cum rerum quam consequatur autem corporis
              debitis? Ullam nobis fugit ab reiciendis quidem quo temporibus
              delectus, fugiat soluta, cupiditate perspiciatis est vel.
              Molestiae, omnis ut! Similique amet cum ex atque? Cum repudiandae
              facilis assumenda recusandae in saepe, qui autem eveniet maxime
              deserunt amet dolorem quis ad impedit architecto ipsum commodi
              libero placeat nesciunt consectetur labore nobis rem quam enim?
              Dolor. Accusantium reiciendis voluptate placeat commodi
              exercitationem eius quibusdam voluptatem doloremque corporis eaque
              modi, necessitatibus corrupti laborum ipsa rerum, dolorem harum
              animi perspiciatis pariatur eveniet. Quis deserunt natus dolore
              qui assumenda. Animi, fuga culpa, quam necessitatibus optio
              quaerat itaque iusto, soluta quo incidunt autem commodi fugit
              voluptate delectus corrupti. Facilis harum enim quibusdam,
              perspiciatis et repellendus quasi quam autem vitae minima. Soluta
              quidem provident architecto omnis accusamus neque cumque officia
              mollitia? Sunt eaque consectetur delectus consequatur, ipsum non
              dolor dolorum at tempore ex suscipit, tempora harum laborum cum
              eos nulla? Sunt. Esse saepe iusto doloremque, quo voluptatum porro
              culpa. Deserunt perspiciatis beatae voluptates error illo
              doloremque sapiente, magnam voluptatum possimus porro quod cumque
              dolorum, molestiae aut ut, nisi rem minima? Ab. Quasi sed cumque
              voluptate ex sit, praesentium vitae debitis hic mollitia!
              Laboriosam quaerat quos minima molestiae deleniti nihil, qui
              eveniet, distinctio incidunt cum deserunt rerum. Ipsa vel debitis
              quidem eveniet? Eligendi esse necessitatibus nostrum earum dolorem
              quo! Officiis debitis asperiores eaque eum neque repellat illo
              adipisci dicta error iure, nostrum, tempora praesentium ipsa
              commodi necessitatibus corporis? Ab eligendi quae eius. Laudantium
              tempore delectus, perferendis omnis amet blanditiis enim hic eius
              necessitatibus repudiandae ut! Laboriosam autem accusamus incidunt
              tenetur. Tenetur minus nesciunt asperiores adipisci blanditiis
              veritatis nam aliquam quaerat esse quasi! Quam libero ipsa velit
              ipsam odit perspiciatis natus voluptatum amet totam dignissimos
              eum ullam consequatur accusantium voluptas doloribus aliquid harum
              consectetur quia repellendus similique, rem adipisci! Consectetur
              quasi rerum dolore? Cupiditate ea nihil ab optio, minus laborum
              quae, voluptas culpa repellendus voluptates quidem? Quis dolore
              dolor, ratione explicabo voluptas a id pariatur molestias ab error
              magni dolorem quia consequuntur debitis. Eveniet maxime, ad iste
              ipsam nemo voluptatem minima, possimus sunt quaerat officiis
              itaque, quod eius aliquid necessitatibus nam! Ut cumque, nam quas
              commodi vitae vero mollitia aliquid laborum sint. Doloribus. Minus
              deserunt nemo, vero nobis enim rerum dolore. Voluptatibus dolorem
              perspiciatis natus incidunt nihil eveniet odio culpa voluptate
              esse itaque ipsa at, quae amet cum harum dolores distinctio,
              repellendus asperiores? Et, quis vero? Iusto, quasi! Corporis sit
              facere et eaque alias provident libero nostrum repudiandae.
              Doloribus autem earum rem voluptatum dolore provident esse? Enim
              ipsam accusantium impedit iste! Deserunt, nisi? Cumque, debitis
              iste! Minima incidunt perferendis cupiditate veritatis dolor vero,
              quod alias libero consectetur iste quam, dolore consequuntur quas.
              Necessitatibus consequuntur doloremque praesentium nostrum facere
              maiores aut accusamus nam voluptatum! Debitis a autem minima, quis
              dolor voluptatibus nihil alias ex facilis quidem dolorum explicabo
              assumenda omnis enim repellat saepe ea odio expedita consequuntur
              doloremque iure beatae quo. Omnis, aliquid temporibus. Quam ad
              saepe officia obcaecati fuga eveniet minima aperiam consequatur
              soluta. Dignissimos assumenda fugiat praesentium nemo inventore
              esse, cum doloribus facilis cupiditate porro. Illum nobis quod
              cupiditate possimus nulla obcaecati. Omnis cum tempora tenetur,
              pariatur ducimus ipsa voluptate corrupti doloribus unde delectus
              repellendus iure, voluptates perferendis laboriosam! Assumenda
              repudiandae alias, pariatur nemo reprehenderit sit dolore
              accusantium necessitatibus doloribus officiis nam? Commodi in
              repellat ipsa alias a praesentium. Totam perferendis expedita
              sapiente cumque dolore laudantium iure placeat temporibus facilis
              maiores, quia ex architecto tempore obcaecati itaque? Sequi
              voluptas reiciendis debitis dolorem? Ullam, vero aliquam voluptas
              obcaecati accusantium magnam error tempore, inventore, amet harum
              temporibus. Inventore dignissimos perferendis cum consequuntur ex
              quod quo expedita similique laborum! Maiores blanditiis laborum
              beatae fugiat quasi. Doloremque tempore temporibus culpa vero
              ipsum necessitatibus impedit cum ab dicta voluptatibus quibusdam
              doloribus hic ea tempora nostrum quo accusamus repellendus maxime
              sequi, veniam deleniti earum facere? Minima, odit accusamus.
              Laudantium fuga officiis expedita explicabo obcaecati minus
              asperiores eveniet maiores dignissimos! Iste incidunt numquam
              animi aperiam, ab ipsam non ut architecto temporibus nobis natus
              corrupti, fugit dicta aliquid cupiditate doloribus. Ipsa ullam
              quasi alias aspernatur et laudantium doloribus ipsam pariatur
              voluptates illum reprehenderit, hic quisquam, similique, vero
              suscipit sed nam ab! Magnam perspiciatis nisi adipisci sunt
              exercitationem officia labore optio. Consequuntur, consectetur
              harum deserunt veniam nulla natus hic aut perspiciatis illo ut
              beatae, tempora animi odio ad? Tempore tenetur reiciendis nemo
              deserunt. Eum omnis, fuga magnam sint quos odit officia. Nostrum
              cupiditate rem, suscipit dolores eaque aliquam fugit dignissimos
              eveniet iure similique quos quaerat quas delectus tempore, quo
              nobis consequatur ab libero porro harum in repellat, pariatur
              doloribus? Sit, id. Rerum optio ipsam laboriosam voluptatum
              impedit cupiditate corporis pariatur nisi distinctio enim
              voluptates ipsum deserunt, quibusdam sint atque necessitatibus,
              est cumque error ad saepe unde dolorem architecto. Pariatur, esse
              aliquid? Expedita porro officia nesciunt dolorem ea vel provident
              similique, ipsum quo, pariatur, voluptates hic laudantium ab. Odio
              esse deleniti nesciunt iste sunt delectus fugiat assumenda quasi
              tempore consectetur. Itaque, laboriosam. Odit ea libero quam esse
              eaque provident, fugiat quod iste qui error alias dolores vitae!
              Omnis, animi nam atque voluptatibus similique amet ex quo! Commodi
              nulla error voluptate eveniet saepe? Voluptates similique commodi
              aliquam hic, voluptate placeat corporis sapiente nemo laborum fuga
              amet tempore saepe repellendus accusantium repellat exercitationem
              dolor deleniti, eaque quibusdam atque nam non provident! Ea, iusto
              consectetur. Harum ab sapiente praesentium placeat! Culpa eligendi
              doloremque nostrum reiciendis aspernatur distinctio beatae et?
              Dolor exercitationem dicta repudiandae soluta officia delectus
              temporibus labore, nihil nulla, dolore iusto doloribus itaque.
              Dolorum? Doloribus, provident repudiandae. Animi esse
              necessitatibus, alias in quia culpa quae minima facere ipsum
              eligendi, ea harum, quibusdam reiciendis voluptates molestias
              exercitationem laudantium excepturi autem. Facere libero quia
              rerum esse. Quisquam ducimus quae accusantium, itaque quia dolore
              eius vero omnis, repudiandae ut mollitia, doloribus nesciunt
              aliquid fuga obcaecati. Sequi maiores quae quis itaque! Odit et
              numquam, molestiae dolores sit laudantium! Cum culpa, esse
              delectus necessitatibus commodi suscipit ab. Consectetur vel qui
              mollitia cupiditate commodi perspiciatis officiis distinctio,
              deleniti ab accusantium dignissimos error doloribus animi tempora
              deserunt eaque quibusdam quo adipisci? Quasi, ipsam, minima animi
              ab molestiae deleniti debitis reiciendis eius, ex labore
              necessitatibus? Sed deserunt modi fugit, aut corrupti rerum
              officiis quae, reprehenderit quis quos quisquam, delectus
              dignissimos magnam ad. Perspiciatis obcaecati alias reiciendis
              cumque in enim laborum ipsam. Dolore, voluptas. Similique
              necessitatibus qui beatae ipsum quod iste doloremque explicabo,
              velit magni. Tempora ea aliquam modi inventore unde! Laborum,
              fugit. Natus itaque similique ipsa fuga odio, velit laborum
              pariatur aperiam, molestias enim eligendi obcaecati excepturi
              corrupti deleniti fugiat minus ex nulla qui possimus cumque
              expedita dolorum maiores maxime ipsam? A. Autem nihil atque eaque
              veritatis perspiciatis labore ipsa, dignissimos unde, porro,
              dolore ab aliquid nesciunt aliquam quidem quae adipisci ut
              provident quibusdam vitae. Veniam eius alias natus sed esse
              excepturi. Temporibus placeat vitae rem tenetur? Molestiae eos
              perferendis perspiciatis esse officia. Adipisci, doloremque
              molestias voluptates excepturi iste debitis porro veritatis culpa
              ut doloribus laborum quia praesentium laudantium nulla. Id, et!
              Dignissimos vel nemo ut minima ab deleniti, architecto sint
              numquam labore accusantium sequi iste nesciunt, laboriosam dicta
              placeat ducimus omnis excepturi? Fugit repellat ab nesciunt esse
              error. Incidunt, doloremque fugit. Veritatis harum adipisci ipsam
              rem commodi sunt doloremque, beatae saepe facere ullam odit error
              molestiae reiciendis, velit cupiditate ex? Earum omnis et numquam
              tenetur porro dolorem voluptatibus nobis fuga praesentium! Eos
              cupiditate libero fugit aperiam velit accusantium quidem magnam!
              Deleniti repellat veniam eos eius nemo quis vel aperiam tempora.
              Autem nobis voluptate molestiae eius debitis culpa quaerat, fugit
              dolorem voluptatibus! Consectetur tenetur veniam sit soluta,
              cumque quibusdam voluptates numquam in nemo expedita deleniti ut
              eius inventore? Dolorem quisquam maiores optio cum perspiciatis
              debitis fuga, accusantium quod distinctio asperiores quam sint.
              Dignissimos aut atque aspernatur voluptates recusandae reiciendis,
              ea ducimus consectetur ad eius laborum nulla corporis perferendis
              debitis exercitationem perspiciatis fuga dolorum reprehenderit
              provident. Facilis autem, optio assumenda explicabo necessitatibus
              perspiciatis. Esse consequatur eum aliquam adipisci molestias
              incidunt eligendi, corporis vero, optio minus explicabo totam
              expedita? Ea temporibus delectus magni molestias aspernatur illum
              corporis! Explicabo cum molestiae quo magni, amet tempora? Natus a
              ipsa, dicta quo qui fugit beatae vitae veritatis facere molestiae
              laboriosam consectetur voluptates rerum repellat ea officiis?
              Mollitia suscipit ipsum neque sit blanditiis consectetur! Odio
              eaque quam suscipit! Esse aliquid neque eveniet inventore?
              Distinctio alias explicabo omnis officiis error obcaecati
              consequuntur est corporis! Ut ab vitae est? Ipsam quod quam
              eveniet, ducimus veritatis accusantium. Perferendis vero non
              omnis? Rem velit inventore consectetur nam dolore, officiis cumque
              eos vitae consequuntur repellendus placeat ullam quisquam iusto
              nisi, in exercitationem beatae, deleniti impedit. Nisi eum
              voluptas, mollitia iste neque ipsam voluptate. Dicta voluptatem
              cupiditate ipsa ex id ipsam distinctio excepturi tempore vitae
              perferendis laboriosam voluptate, sunt eligendi adipisci error
              inventore at! Quae praesentium atque iste. Voluptas maxime nisi
              corrupti temporibus rem! Voluptatibus natus dolor quia fugit
              inventore accusamus, ad consequuntur eaque! Non repellendus natus
              perspiciatis? Cumque iure totam mollitia sit, ipsam labore
              voluptas iusto error temporibus, modi odio, alias numquam.
              Voluptate! Quis quam sint provident, consequatur odio maiores est
              libero magni? Eligendi harum, ratione sed architecto dolore cum
              quis, quidem ipsum maiores, debitis quia voluptatum magnam sint
              deleniti optio neque earum! Optio assumenda qui cupiditate ullam
              omnis animi. Esse dignissimos, delectus labore, at quis illo quam
              veniam, unde itaque optio dolore culpa ut? Consequatur praesentium
              eos obcaecati? Voluptatum saepe tenetur assumenda? Magni soluta
              voluptatem, recusandae voluptas ratione illo sapiente consequatur
              ea perspiciatis in vitae vel voluptates! Vel magnam dolorem
              aliquid aspernatur eos, enim ex veniam nesciunt quod soluta
              officia quidem deserunt. Sapiente laborum id debitis aliquam enim
              quod similique, aperiam quibusdam quae quaerat! Saepe veritatis
              dicta, placeat qui molestias odit magni reiciendis officiis et
              quos! Sint temporibus laborum ab commodi error! Molestiae aliquam
              fugit asperiores, error ad dolore nostrum totam repellat quis
              accusamus iusto alias veritatis reprehenderit? Nihil repudiandae
              delectus veritatis, molestias debitis minus earum vel modi placeat
              ipsa non quia? Dolores cupiditate placeat commodi perspiciatis
              iusto. In, dolorem blanditiis quas harum architecto inventore cum
              fugiat possimus repellat. Recusandae, magni quibusdam laborum,
              assumenda quo aut fugit sunt, delectus vitae soluta rem? Ipsa
              facere animi, eveniet dolorem ea ullam iusto totam, pariatur
              maxime, accusamus iure omnis exercitationem consequatur quaerat
              est labore modi similique. Similique sunt quaerat assumenda
              temporibus, repellendus aspernatur voluptas eum! Quisquam
              aspernatur maxime dolorem expedita dolore, maiores eligendi eius
              ipsum possimus excepturi doloribus, asperiores non repudiandae,
              vero impedit hic ea. Nesciunt totam blanditiis facere expedita
              cumque earum voluptatem minus? Vitae? Voluptatibus perferendis
              dolores accusantium corporis ipsum eos impedit non dolor
              reiciendis? Distinctio commodi dolorem quam, explicabo culpa harum
              eveniet debitis quibusdam iure enim ullam quas doloremque omnis in
              aperiam cumque! Asperiores recusandae molestias rem hic vitae
              excepturi, repellat, inventore suscipit quibusdam similique dicta
              earum nostrum debitis, temporibus sit laudantium mollitia fuga
              nobis aliquid quo error cupiditate cum! Quis, numquam repellat. Et
              quas explicabo accusantium optio dicta enim nemo esse obcaecati
              quidem recusandae tenetur asperiores suscipit eaque a ea
              exercitationem nihil dolore non eum quisquam reiciendis, ipsum
              aspernatur. Vitae, neque saepe? Vel recusandae ipsum ratione
              inventore totam at dolor doloremque et soluta, rem numquam modi,
              debitis dignissimos officia porro adipisci! Eos accusantium
              ducimus aperiam doloribus nesciunt error vitae dolorem cupiditate
              explicabo. Debitis, accusamus. Quibusdam iure voluptas sit
              perspiciatis. Fuga amet minima maxime ratione ducimus aut quisquam
              neque enim, porro eaque laudantium molestias reiciendis
              consequuntur debitis provident, nemo nostrum impedit dignissimos
              laboriosam? Maxime cupiditate magnam fuga eaque vel porro quas
              quasi officia eveniet, est, atque molestias doloremque in
              accusamus rerum nemo accusantium iure magni. Inventore enim
              molestias iure perferendis quam! Sit, repellendus. Ullam sit
              mollitia unde vitae magnam ipsam culpa asperiores ipsum et? Atque
              aliquam ullam officia explicabo! Iure non, in consequuntur magnam,
              illo repellendus adipisci quaerat vitae asperiores impedit itaque
              natus? Odio ex ut vitae tenetur rerum repudiandae eaque quibusdam,
              doloribus sunt, at eius sint sequi accusantium praesentium earum
              nostrum magni nobis ab quisquam minus optio fugit porro!
              Reiciendis, nesciunt nisi. Animi architecto consequuntur nesciunt
              veniam voluptas, mollitia culpa modi! Debitis, eum. Nam
              repellendus asperiores cum, facilis animi, quae iusto ipsum
              laudantium nemo at laboriosam voluptate dolorem quo, distinctio
              sapiente dolor. Enim libero iure fugiat fuga, id esse soluta quos
              numquam reiciendis maxime minima vero. Modi fuga, voluptate iste
              ad dolores ut blanditiis aperiam libero, recusandae provident
              incidunt nulla maxime animi? Ad laboriosam tenetur laborum minima,
              assumenda magni at iusto corporis amet quia exercitationem fugit
              asperiores velit dolor consequuntur dicta dolores repudiandae
              atque et tempore voluptatibus veniam optio! Eaque, vel modi! Ex
              obcaecati incidunt officiis quia suscipit voluptas corrupti
              quaerat fugiat ipsa dicta, nesciunt laboriosam facere temporibus,
              possimus voluptates explicabo eius perferendis odit laborum,
              doloremque rem sequi repudiandae dolorum. Deleniti, aut. Harum a
              laudantium et perferendis porro, expedita corrupti sapiente
              aspernatur cupiditate quisquam beatae doloribus ipsum repellat
              nihil dolor non neque nemo, officiis, eligendi quibusdam magnam
              natus? Quibusdam quisquam sapiente velit. Esse, magnam sapiente,
              fugiat, exercitationem possimus ab odit quam at vel voluptatum
              illo quod est voluptates eius minima dolores harum? Minus porro
              esse nostrum pariatur tenetur libero ex reiciendis dolores.
              Aspernatur, maiores. Aspernatur, nulla eum dignissimos vel natus
              nam perspiciatis iure nemo nobis odio assumenda eaque obcaecati
              tenetur quod quisquam numquam reprehenderit. Repellat natus
              excepturi quo facilis, unde voluptate mollitia? Consequatur,
              perferendis natus eveniet quaerat eos repellat recusandae
              officiis, laboriosam maxime sed quo odio facilis ad excepturi
              nulla inventore asperiores? Ab autem explicabo eligendi mollitia
              earum asperiores harum facere blanditiis! Omnis voluptas
              asperiores quam eligendi, commodi voluptate fugit distinctio
              corrupti maiores sed, voluptates dicta cupiditate? Ex architecto
              perspiciatis officia qui numquam consectetur nisi, illum, quis
              harum laboriosam, maxime autem. Aut! Recusandae quis soluta
              commodi, vero quod perferendis placeat eum explicabo nemo
              consectetur nam nulla ipsa! Veritatis magni itaque, unde,
              distinctio eius ullam voluptate culpa quo vitae voluptatem
              deserunt et id? Nostrum cum deleniti nobis fuga cumque facilis
              consequatur dolores veniam ad debitis quae quas nulla, odio,
              delectus iure beatae commodi ea laboriosam excepturi perspiciatis
              ut voluptate? Explicabo animi cum assumenda! Dolorum ad
              consequuntur distinctio cupiditate voluptas a saepe eligendi
              labore explicabo suscipit corporis possimus facilis, laboriosam
              praesentium perspiciatis mollitia! Illo alias ab eos similique
              perspiciatis! Nam, iste? Sunt, vero impedit. Quasi molestias quia
              tenetur natus minima. Eos quibusdam aut officiis natus nisi labore
              voluptate error ab vel mollitia ducimus asperiores hic molestias
              blanditiis officia, doloremque suscipit aspernatur, neque cum
              dolor. Corrupti, saepe? Libero ad numquam magnam beatae autem
              cumque sunt sint eum est? Magni harum minima voluptatum hic
              temporibus, praesentium qui reiciendis culpa rem dignissimos
              earum, sapiente exercitationem, consectetur blanditiis! Fugit
              animi aut doloremque fuga quisquam, quaerat nam similique qui
              provident sed ipsam, quas veritatis tempora. Dicta non qui quasi
              molestiae deserunt consequuntur aspernatur, cum laborum deleniti,
              natus modi delectus. Minima harum sapiente facilis doloribus
              corrupti quis veritatis excepturi quaerat corporis expedita!
              Corporis fugiat perferendis quos totam necessitatibus debitis
              natus repudiandae ea quia nobis ratione saepe praesentium, dolore
              quasi adipisci. Ad expedita aspernatur amet nostrum explicabo
              quidem odit dolore adipisci illum consectetur placeat ab ipsum,
              eligendi, officiis laudantium corrupti voluptatibus totam, quod
              nemo optio quibusdam distinctio pariatur. Recusandae, ad illum.
              Doloremque quam quasi, recusandae incidunt ratione reprehenderit
              minima consequuntur voluptates adipisci repudiandae, similique
              fugit, mollitia asperiores in nihil! Libero velit vel dolorem
              possimus vero nam totam iste corporis quis id! Quod nihil itaque
              eos, laudantium et officiis quia totam illo nesciunt dolorem
              repudiandae. Aspernatur, commodi ab obcaecati reprehenderit labore
              ratione asperiores. Incidunt a accusantium excepturi aperiam iusto
              dignissimos esse tempora! Accusamus iusto, a, reprehenderit at
              laudantium inventore ducimus alias commodi nesciunt nisi quo dicta
              aliquam animi exercitationem maxime error illum minima cupiditate
              deserunt totam. Deleniti maiores dolorum culpa facere quam.
              Officia voluptatem dolore minima ut eveniet omnis quo expedita
              perferendis, magni corporis tempora asperiores odit molestiae
              consectetur eligendi sunt reiciendis? Excepturi quidem qui libero
              soluta corrupti aperiam numquam illum ipsa. Assumenda, culpa magni
              illo excepturi perspiciatis delectus aperiam dignissimos facere
              accusamus possimus inventore at, corrupti officia est laudantium
              impedit facilis ducimus. Itaque veritatis, est pariatur
              consectetur quod facilis iste nostrum! Maiores, est? Dignissimos,
              quidem eius totam ratione quos odio accusantium delectus quaerat
              obcaecati architecto pariatur numquam quia mollitia maxime ex?
              Soluta quia praesentium consequatur, similique repellendus earum
              qui officia minima. Dicta labore natus velit, repellendus
              consequuntur deleniti dolor non, impedit voluptatem neque
              laboriosam! Earum, sunt molestiae quisquam adipisci tenetur,
              voluptate illum inventore modi architecto, harum facilis sint
              dicta eum distinctio. Sequi fugit a eaque saepe accusantium, dicta
              numquam delectus tenetur animi. Cum doloribus quas quam dolores?
              Maxime dolorum doloremque sapiente facere. Hic quibusdam ab,
              perferendis incidunt sapiente aliquam impedit accusamus! Ullam,
              obcaecati dolore excepturi minima doloremque dignissimos
              aspernatur laborum quaerat beatae nemo delectus tempora? Porro non
              unde id nostrum repellat tempora excepturi debitis molestias! Nemo
              vitae consequatur tempora cumque quia. Magni obcaecati cum eius
              tempora! Modi adipisci fuga voluptatibus eius iste delectus
              consequuntur aliquid ratione sequi sed consequatur expedita nam
              vero quam officiis veritatis enim, nobis saepe doloribus quia ex.
              A sint totam laborum magnam earum debitis harum, deleniti dolor
              velit exercitationem, libero nisi distinctio esse eum voluptatum
              repudiandae sunt ex eius quaerat! Atque incidunt expedita labore
              odio inventore asperiores? Labore cumque explicabo quasi libero
              maxime nesciunt excepturi iure autem odio? Id, commodi corrupti
              qui sint obcaecati reprehenderit autem esse neque ipsum similique
              tempore doloremque quos, aliquam perferendis a ratione? Non ipsam
              architecto autem voluptatibus quo veniam asperiores similique
              molestiae quae maiores optio dolorem est eum sint ea vero
              excepturi ab nostrum quisquam amet, odio fugit facere blanditiis!
              Excepturi, aut. Delectus, ullam quia aspernatur similique
              laboriosam hic recusandae nisi dolor temporibus, atque tempore.
              Eligendi aperiam aliquid laudantium saepe animi ipsam voluptates
              id, tempora rem ducimus magnam, recusandae blanditiis at
              aspernatur. Quod similique accusantium atque iure, dolorum
              deleniti, facilis impedit quis temporibus quo praesentium, rem
              cumque. Iusto, veniam necessitatibus! Hic quos distinctio quasi,
              temporibus accusamus facilis alias laboriosam necessitatibus aut
              nulla! Saepe ea officia doloremque molestiae, similique libero
              accusamus nostrum? Rem fuga quia laborum necessitatibus aliquam,
              quos at soluta doloribus aperiam similique, quibusdam hic porro
              cum nobis quaerat asperiores illo voluptates. Facere vel,
              provident vitae eaque adipisci, corporis voluptatem a tempore, qui
              fugiat sint. Voluptatibus expedita nam assumenda. Eaque
              reprehenderit neque porro? Rerum vero dolore, nisi sit excepturi
              accusantium iste dolor. Recusandae, praesentium distinctio
              consequatur ipsum similique eius laboriosam officiis. Voluptate
              provident aliquam numquam, eius beatae magnam porro reprehenderit
              necessitatibus! Beatae nihil architecto accusamus porro vel et
              neque ullam blanditiis molestiae. Deserunt eveniet impedit
              pariatur maiores sit omnis delectus laudantium perspiciatis
              deleniti eum itaque ipsa inventore, optio, nisi laborum et quis
              odit reprehenderit ipsam! Molestias illo totam amet eaque
              inventore velit! Maxime sequi recusandae aspernatur inventore
              deserunt, vero nobis ullam architecto rerum ipsam eaque quisquam
              eligendi. Asperiores, consequatur, quis, alias fuga recusandae
              maiores sapiente expedita iste consequuntur quas qui perferendis
              delectus? Vitae animi labore architecto ipsa accusantium pariatur
              possimus provident omnis dolor nostrum recusandae natus quae optio
              aut, tempore at explicabo impedit, dolore, qui iusto alias
              voluptas dolorum magnam? Dolore, porro. Ducimus odit deserunt
              praesentium facilis voluptate, qui quia accusamus iusto quae sunt
              suscipit sequi ratione aliquam vel nemo neque consectetur soluta
              alias sed fugit omnis optio ad perferendis? Explicabo, pariatur.
              Alias maxime harum repellendus, impedit, reiciendis eligendi odio,
              quam quos ex molestiae voluptatibus. Ipsa saepe esse, illo tempore
              tempora aut deleniti eaque ipsum ratione fugiat eligendi, sint
              dolorum amet error. Id ipsa iure obcaecati! Porro, praesentium?
              Eveniet quasi dolor iure quaerat enim, ducimus porro placeat,
              reprehenderit aspernatur at, ipsam quibusdam ullam error
              perferendis ab deleniti modi labore saepe veritatis quis. Sit
              tenetur neque animi harum quasi eligendi, aut ratione omnis, cum
              expedita, beatae dolorum asperiores inventore voluptas atque? Quia
              incidunt impedit veritatis amet debitis delectus ipsam dolores
              rerum minus inventore? Nobis, porro eaque corrupti laudantium quos
              repellat, tempora sit quia cum dolore magnam eveniet animi.
              Mollitia nesciunt illum doloremque nostrum excepturi tempore
              numquam atque ut esse laboriosam. Quis, delectus incidunt! In iure
              animi aut illum delectus accusamus distinctio magni, odit a
              dolorem, repellendus eveniet. Hic, sunt laborum perspiciatis in
              nam veniam explicabo possimus, magnam cumque debitis ullam, natus
              tempora rerum. Sit enim perferendis, iusto facilis cupiditate ut,
              blanditiis quod aliquid recusandae expedita est architecto?
              Blanditiis incidunt ipsum nisi omnis molestiae consequuntur minus,
              amet aut, quia ut doloremque exercitationem dolorem? Alias. Et
              aspernatur voluptatem, inventore sit, ad earum quo corporis hic ea
              nisi, nulla dignissimos. Dolores animi quia, officiis cumque
              mollitia doloribus nostrum qui maxime dolorum autem minima illo et
              quibusdam.
            </p>
          </div>
          <div className="relative mb-6 flex flex-none px-4">
            <span className="flex-none rounded-l-lg bg-channeltextarea-background px-4 py-[0.625rem] text-interactive-normal hover:text-interactive-hover">
              <Icon.AttachPlus className="cursor-pointer" />
            </span>
            <div
              className="max-h-[29.375rem] min-h-[2.75rem] flex-1 overflow-y-auto rounded-r-lg bg-channeltextarea-background py-[0.625rem] font-primary text-normal outline-none -webkit-scrollbar:h-3 -webkit-scrollbar:w-3 -webkit-scrollbar-thumb:rounded-lg -webkit-scrollbar-thumb:border-4 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-[rgba(24,25,28,.6)] -webkit-scrollbar-thumb:bg-clip-padding"
              contentEditable
            ></div>
            <div className="absolute right-5 top-1 flex flex-none items-center">
              <div className="mx-1 cursor-pointer p-1 text-interactive-normal hover:text-interactive-active">
                <Icon.Gift />
              </div>
              <div className="mx-1 cursor-pointer p-1 text-interactive-normal hover:text-interactive-active">
                <Icon.GIF />
              </div>
              <div className="mx-1 cursor-pointer p-1 text-interactive-normal hover:text-interactive-active">
                <Icon.Sticker />
              </div>
            </div>
          </div>
        </div>
        {CurrentChat && CurrentChat?.participants.length > 1 && viewMemberList && (
          <div className="flex w-60 flex-none flex-col overflow-y-scroll bg-secondary -webkit-scrollbar:h-2 -webkit-scrollbar:w-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:rounded -webkit-scrollbar-thumb:border-2 -webkit-scrollbar-thumb:border-solid -webkit-scrollbar-thumb:border-transparent -webkit-scrollbar-thumb:bg-transparent -webkit-scrollbar-thumb:bg-clip-padding hover:-webkit-scrollbar-thumb:bg-scrollbar-thin-thumb">
            <label className="pt-6 pr-2 pl-4 font-display text-xs font-semibold tracking-[0.015625rem] text-channel-default">
              MEMBERS—{CurrentChat?.participants.length}
            </label>

            {CurrentChat?.participants.map(
              (participant: string, index: any) => (
                <div
                  key={index}
                  className="group ml-2 flex h-11 flex-none cursor-pointer items-center rounded-[0.25rem] px-2 py-[0.0625rem] text-interactive-normal hover:bg-modifier-hover hover:text-interactive-hover"
                >
                  <AvatarIcon />
                  <label className="ml-3 mt-[0.0625rem] cursor-pointer truncate font-primary text-base font-medium leading-5 text-channel-default group-hover:text-interactive-hover">
                    {participant}
                  </label>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default connector(ChatView);
