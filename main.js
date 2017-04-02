//**********debug variables**************
var hidestuff = 1;	//for debug, change to 1 for gameplay
var loadOnStart = true;

//***global constants, don't need to save*********
var autosavecounter = 0;
var agehealthappeals = [.10,.30,.70,.90]; //% of appeal of healthy ingredients to children, teens, adults, elderly
var agetasteappeals = [.90,.70,.30,.10];  //same as above but for tasty ingredients
var namenouns = ['Flakes','Bunches','O\'s','Puffs','Crisps','Squares','Balls','Pops','Snaps','Bursts','Crunch','Bites','Bytes','Loops','Charms','One','Complete','Total',
'Cereal','Delight','Nuggets','Orbs','Spheres','Triangles','Smackers','Handfuls','Nibs','Nubs','Thingees','Krunchers','Pebbles','Euphoria','Enlightenment','Rapture',
'Temptations','Dreams','Illusions','Experiences','Treasures','Spoonriders','Milk Buddies','Chunks','Pieces'];
var nameadjectives = ['Awesome','Amazing','Appealing','Bountiful','Beauteous','Best','Crunchy','Chewy','Choice','Crazy','Delicious','Double','Dancing','Enchanting',
'Exciting','Energizing','Electric','Enormous','Family','Friendly','Fantastic','Fancy','Fine','Foodlike','Gigantic','Grand','Gorgeous','Happy','Healthy','Hearty',
'Hilarious','Interesting','Illuminating','Jumbo','Jovial','Junior','Kraken','Knightly','Lordly','Luscious','Laughable','Loud','Masculine','Masterful','Mundane',
'Mostly','Munchy','Mouthwatering','Mega','Nutritious','Nice','Nuanced','Neo','New','Optimum','Odd','Pleasant','Powerful','Pungent','Punchy','Proud','Quarreling',
'Quiet','Robust','Real','Salty','Sweet','Stalwart','Spicy','Savory','Stupendous','Tantalizing','Tempting','The','Team','Toasted','Understated','Ubiquitous',
'Vivacious','Wild','Wacky','Wonderful','Worthwhile','Zany'];
var anitext = {id:[], life:[],index:0}; //thinking I do not need to save this because on a Load, none of the anitext devs should exist

//****variables that will need to be saved**********
var player={}; //object for storing all this stuff for saving purposes...

var bank = 100;
var salary = {wallet:0,unpaid:0,counter:0};
var boxsale = 1.5;
var boxcost = 0.5;
var neworders = 0;
var openorders = 4;
var lastsold = 0;
var ef = 1;
var stock = {current:0,max:100,percent1:"0%",percent2:"0%"};
var time = {year:0,day:1,clock:["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM"],clockindex:0};
var pdp = {boxesmade:0,boxesshipped:0,boxesscrapped:0,materialcosts:0,payrollcosts:0,totalcosts:0,grossreceipts:0,
netprofit:0,payrollforhiredtoday:0,oldstock:0,todayspayroll:0};
var demand = {old:[1,1,1,1],current:[1,1,1,1],mboost:[0,0,0,0],c:35,d:0.65,namedbonus:1,designboost:1,designboostactive:[0,0,0,0],designboostamount:[1.5,3,4,5]};

var sparks = {current:0,change:1,baserate:1,sparksperfizz:5,sparkspertech:10};
var stress = {current:0,change:0,baserate:1,reduction:1};
var staff = {current:0,max:5,payroll:0};  //totalizer for all staff
var fizz = {current:0,change:0};
var tech = {current:0,change:0};

var cerealname = '';

var unlocks = {assemblypanel:0,staffpanel:0,buildingspanel_w:0,buildingspanel_f:0,stressreductionspanel:0,
marketingpanel:0,marketers:0,researchpanel:0,engineers:0,recipepanel:0,reportspanel:0,
dryers:0, inspectors:0, toasters:0, grinders:0, frosters:0};

var totalboxesshipped=0,profityesterday=0;

function staffObject(name,wage,yield) {this.name=name; this.wage=wage; this.yield = yield; this.current=0; this.payroll=0;}
var workers = new staffObject('Workers',5,1);
var marketers = new staffObject('Marketers',25,1);
var engineers = new staffObject('Engineers',50,1);

var camps_active=[0,0,0,0,0,0,0,0,0,0,0];  //save this guy
var camps_funded=[0,0,0,0,0,0,0,0,0,0,0];  //save this guy
var adboost=[1,1,1,1]; //just to initialize; will be calculating fresh every calcdemand

//only need to save mascot.name
var mascot = {name:'',
boynames:['Aaron','Abel','Abraham','Adam','Adrian','Aidan','Aiden','Alan','Alejandro','Alex','Alexander','Andrew','Angel','Anthony','Antonio','Asher','Ashton','Austin','Avery','Axel','Ayden','Benjamin','Bennett','Bentley','Blake','Bradley','Brady','Brandon','Brantley','Braxton','Brayden','Brian','Brody','Bryan','Bryce','Bryson','Caden','Caleb','Calvin','Camden','Cameron','Carlos','Carson','Carter','Cayden','Charles','Chase','Christian','Christopher','Cole','Colin','Colton','Connor','Cooper','Damian','Daniel','David','Declan','Diego','Dominic','Dylan','Easton','Edward','Eli','Elias','Elijah','Emmanuel','Emmett','Eric','Ethan','Evan','Everett','Ezekiel','Ezra','Gabriel','Gael','Gage','Gavin','George','Giovanni','Grant','Grayson','Greyson','Harrison','Hayden','Henry','Hudson','Hunter','Ian','Isaac','Isaiah','Ivan','Jace','Jack','Jackson','Jacob','Jaden','Jake','James','Jameson','Jase','Jason','Jaxon','Jaxson','Jayce','Jayden','Jeremiah','Jeremy','Jesse','Jesus','Joel','John','Jonah','Jonathan','Jordan','Jose','Joseph','Joshua','Josiah','Juan','Jude','Julian','Justin','Kaden','Kai','Kaiden','Kaleb','Kayden','Kenneth','Kevin','King','Kingston','Kyle','Landon','Leo','Leonardo','Levi','Liam','Lincoln','Logan','Lucas','Luis','Luke','Maddox','Malachi','Marcus','Mark','Mason','Mateo','Matthew','Max','Maximus','Maxwell','Micah','Michael','Miguel','Miles','Nathan','Nathaniel','Nicholas','Nicolas','Noah','Nolan','Oliver','Oscar','Owen','Parker','Patrick','Paul','Preston','Richard','Riley','Robert','Roman','Ryan','Ryder','Ryker','Samuel','Santiago','Sawyer','Sean','Sebastian','Silas','Steven','Tanner','Theodore','Thomas','Timothy','Tristan','Tucker','Tyler','Victor','Vincent','Wesley','Weston','William','Wyatt','Xavier','Zachary','Zayden'],
girlnames:['Aaliyah','Abigail','Adalyn','Adalynn','Addison','Adriana','Alaina','Alana','Alexa','Alexandra','Alexia','Alexis','Alice','Alivia','Aliyah','Allison','Alyssa','Amelia','Amy','Andrea','Angela','Angelina','Anna','Annabelle','Aria','Ariana','Arianna','Ariel','Ashley','Aubree','Aubrey','Audrey','Aurora','Autumn','Ava','Avery','Bailey','Bella','Brianna','Brielle','Brooke','Brooklyn','Brooklynn','Camila','Caroline','Catherine','Charlotte','Chloe','Claire','Clara','Cora','Daisy','Delilah','Destiny','Eden','Eleanor','Elena','Eliana','Elise','Eliza','Elizabeth','Ella','Ellie','Emery','Emily','Emma','Eva','Evelyn','Faith','Fiona','Gabriella','Gabrielle','Genesis','Gianna','Grace','Gracie','Hadley','Hailey','Hannah','Harper','Hayden','Hazel','Isabel','Isabella','Isabelle','Isla','Ivy','Izabella','Jade','Jasmine','Jayla','Jennifer','Jessica','Jocelyn','Jordyn','Josephine','Julia','Juliana','Julianna','Kaitlyn','Kate','Katelyn','Katherine','Kayla','Kaylee','Kendall','Kendra','Kennedy','Khloe','Kimberly','Kinsley','Kylee','Kylie','Laila','Lauren','Layla','Leah','Lila','Liliana','Lillian','Lilly','Lily','London','Londyn','Lucy','Luna','Lydia','Lyla','Mackenzie','Madeline','Madelyn','Madison','Makayla','Makenzie','Margaret','Maria','Mariah','Mary','Maya','Mckenzie','Melanie','Melody','Mia','Michelle','Mila','Molly','Morgan','Mya','Naomi','Natalia','Natalie','Nevaeh','Nicole','Nora','Norah','Olivia','Paige','Paisley','Payton','Penelope','Peyton','Piper','Presley','Quinn','Rachel','Reagan','Rebecca','Reese','Riley','Ruby','Rylee','Ryleigh','Sadie','Samantha','Sara','Sarah','Savannah','Scarlett','Serenity','Skylar','Sofia','Sophia','Sophie','Stella','Stephanie','Summer','Sydney','Taylor','Trinity','Valentina','Valeria','Valerie','Vanessa','Victoria','Violet','Vivian','Willow','Ximena','Zoe','Zoey'],
animals:['Aardwolf','Afghan Hound','Albatross','Alligator','Alpaca','Anaconda','Angelfish','Anglerfish','Ant','Anteater','Antelope','Antlion','Ape','Aphid','Armadillo','Arrow Crab','Asp','Baboon','Badger','Bald Eagle','Bandicoot','Barnacle','Basilisk','Barracuda','Bass','Basset Hound','Bat','Beaked Whale','Bear','Beaver','Bedbug','Bee','Beetle','Bird','Bison','Blackbird','Black Panther','Black Widow Spider','Blue Jay','Blue Whale','Boa','Bobcat','Bobolink','Bonobo','Booby','Box Jellyfish','Boston Terrier','Bovid','Buffalo','Bug','Bulldog','Bull Terrier','Butterfly','Buzzard','Camel','Canid','Cape Buffalo','Cardinal','Caribou','Carp','Cat','Caterpillar','Catfish','Centipede','Cephalopod','Chameleon','Cheetah','Chickadee','Chicken','Chihuahua','Chimpanzee','Chinchilla','Chipmunk','Clam','Clownfish','Cobra','Cockroach','Cod','Collie','Condor','Constrictor','Coral','Cougar','Cow','Coyote','Crab','Crane','Crane Fly','Crawdad','Crayfish','Cricket','Crocodile','Crow','Cuckoo','Daddy Longlegs','Damselfly','Deer','Dingo','Dinosaur','Dog','Dolphin','Donkey','Dormouse','Dove','Dragonfly','Duck','Dung Beetle','Eagle','Earthworm','Earwig','Echidna','Eel','Egret','Elephant','Elephant Seal','Elk','Emu','English Pointer','English Setter','Ermine','Falcon','Ferret','Finch','Firefly','Fish','Flamingo','Flea','Fly','Flyingfish','Fowl','Fox','Frog','Fruit Bat','Gazelle','Gecko','Gerbil','German Shepherd','Giant Panda','Giant Squid','Gibbon','Gila Monster','Guanaco','Guineafowl','Giraffe','Goat','Golden Retriever','Goldfinch','Goldfish','Goose','Gopher','Gorilla','Grasshopper','Great Blue Heron','Great Dane','Great White Shark','Greyhound','Grizzly Bear','Grouse','Guinea Pig','Gull','Guppy','Haddock','Halibut','Hammerhead Shark','Hamster','Hare','Harrier','Hawk','Hedgehog','Hermit Crab','Heron','Herring','Hippopotamus','Hookworm','Hornet','Horse','Hound','Human','Hummingbird','Humpback Whale','Husky','Hyena','Iguana','Impala','Insect','Irish Setter','Irish Wolfhound','Irukandji Jellyfish','Jackal','Jaguar','Jay','Jellyfish','Kangaroo','Kangaroo Mouse','Kangaroo Rat','Kingfisher','Kite','Kiwi','Koala','Koi','Komodo Dragon','Krill','Labrador Retriever','Ladybug','Lamprey','Lark','Leech','Lemming','Lemur','Leopard','Leopon','Liger','Lion','Lizard','Llama','Lobster','Locust','Loon','Louse','Lungfish','Lynx','Macaw','Mackerel','Magpie','Mammal','Mammoth','Manta Ray','Marlin','Marmoset','Marmot','Marsupial','Marten','Mastiff','Mastodon','Meadowlark','Meerkat','Mink','Minnow','Mite','Mockingbird','Mole','Mollusk','Mongoose','Monitor Lizard','Monkey','Moose','Mosquito','Moth','Mountain Goat','Mouse','Mule','Muskox','Mussel','Narwhal','Newt','Nightingale','Ocelot','Octopus','Old English Sheepdog','Opossum','Orangutan','Orca','Ostrich','Otter','Owl','Ox','Oyster','Panda','Panther','Panthera Hybrid','Parakeet','Parrot','Parrotfish','Partridge','Peacock','Peafowl','Pekingese','Pelican','Penguin','Perch','Peregrine Falcon','Persian Cat','Pheasant','Pig','Pigeon','Pike','Pilot Whale','Pinniped','Piranha','Planarian','Platypus','Polar Bear','Pony','Poodle','Porcupine','Porpoise','Possum','Prairie Dog','Prawn','Praying Mantis','Primate','Puffin','Puma','Python','Quail','Rabbit','Raccoon','Rainbow Trout','Rat','Rattlesnake','Raven','Ray','Red Panda','Reindeer','Rhinoceros','Right Whale','Roadrunner','Robin','Rodent','Rook','Rooster','Roundworm','Saber-Toothed Cat','Sailfish','Saint Bernard','Salamander','Salmon','Sawfish','Scale Insect','Scallop','Scorpion','Sea Cow','Seahorse','Sea Lion','Sea Slug','Sea Urchin','Setter','Shark','Sheep','Shrew','Shrimp','Siamese Cat','Silkworm','Skink','Skunk','Sloth','Slug','Smelt','Snail','Snake','Snipe','Snow Leopard','Sockeye Salmon','Sole','Spaniel','Sparrow','Sperm Whale','Spider','Spider Monkey','Spoonbill','Squid','Squirrel','Starfish','Star-Nosed Mole','Steelhead Trout','Stingray','Stoat','Stork','Sturgeon','Sugar Glider','Swallow','Swan','Swift','Swordfish','Swordtail','Tabby Cat','Tahr','Takin','Tapeworm','Tapir','Tarantula','Tasmanian Devil','Termite','Tern','Terrier','Thrush','Tick','Tiger','Tiger Shark','Tigon','Toad','Tortoise','Toucan','Toy Poodle','Trapdoor Spider','Tree Frog','Trout','Tuna','Turkey','Turtle','Tyrannosaurus','Urial','Vampire Bat','Viper','Vole','Vulture','Wallaby','Walrus','Wasp','Warbler','Water Buffalo','Weasel','Whale','Whitefish','Whooping Crane','Wildcat','Wildebeest','Wildfowl','Wolf','Wolverine','Wombat','Woodpecker','Worm','Wren','Yak','Zebra'],
adjectives:['Abandoned','Able','Absolute','Academic','Acceptable','Acclaimed','Accomplished','Accurate','Aching','Acidic','Acrobatic','Active','Actual','Adept','Admirable','Admired','Adolescent','Adorable','Adorable','Adored','Advanced','Adventurous','Affectionate','Afraid','Aged','Aggravating','Aggressive','Agile','Agitated','Agonizing','Agreeable','Ajar','Alarmed','Alarming','Alert','Alienated','Alive','Altruistic','Amazing','Ambitious','Ample','Amused','Amusing','Anchored','Ancient','Angelic','Angry','Anguished','Animated','Annual','Antique','Anxious','Apprehensive','Appropriate','Apt','Arctic','Arid','Aromatic','Artistic','Ashamed','Assured','Astonishing','Athletic','Attached','Attentive','Attractive','Austere','Authentic','Authorized','Automatic','Avaricious','Average','Aware','Awesome','Awful','Awkward','Babyish','Back','Bad','Baggy','Bare','Barren','Basic','Beautiful','Belated','Beloved','Beneficial','Best','Better','Bewitched','Big','Big-Hearted','Biodegradable','Bite-Sized','Bitter','Black','Black-And-White','Bland','Blank','Blaring','Bleak','Blind','Blissful','Blond','Blue','Blushing','Bogus','Boiling','Bold','Bony','Boring','Bossy','Bouncy','Bountiful','Bowed','Brave','Breakable','Brief','Bright','Brilliant','Brisk','Broken','Bronze','Brown','Bruised','Bubbly','Bulky','Bumpy','Buoyant','Burdensome','Burly','Bustling','Busy','Buttery','Buzzing','Calculating','Calm','Candid','Canine','Capital','Carefree','Careful','Careless','Caring','Cautious','Cavernous','Celebrated','Charming','Cheap','Cheerful','Cheery','Chief','Chilly','Chubby','Circular','Classic','Clean','Clear','Clear-Cut','Clever','Close','Closed','Cloudy','Clueless','Clumsy','Cluttered','Coarse','Cold','Colorful','Colorless','Colossal','Comfortable','Common','Compassionate','Competent','Complete','Complex','Complicated','Composed','Concerned','Concrete','Confused','Conscious','Considerate','Constant','Content','Conventional','Cooked','Cool','Cooperative','Coordinated','Corny','Corrupt','Costly','Courageous','Courteous','Crafty','Crazy','Creamy','Creative','Creepy','Criminal','Crisp','Critical','Crooked','Crowded','Cruel','Crushing','Cuddly','Cultivated','Cultured','Cumbersome','Curly','Curvy','Cute','Cylindrical','Damaged','Damp','Dangerous','Dapper','Daring','Dark','Darling','Dazzling','Dead','Deadly','Deafening','Dear','Dearest','Decent','Decimal','Decisive','Deep','Defenseless','Defensive','Defiant','Deficient','Definite','Definitive','Delayed','Delectable','Delicious','Delightful','Delirious','Demanding','Dense','Dental','Dependable','Dependent','Descriptive','Deserted','Detailed','Determined','Devoted','Different','Difficult','Digital','Diligent','Dim','Dimpled','Dimwitted','Direct','Dirty','Disastrous','Discrete','Disfigured','Disguised','Disgusting','Dishonest','Disloyal','Dismal','Dismal','Distant','Distant','Distinct','Distorted','Dizzy','Dopey','Doting','Double','Downright','Downright','Drab','Drafty','Dramatic','Dreary','Dreary','Droopy','Dry','Dual','Dull','Dutiful','Each','Eager','Early','Earnest','Easy','Easy-Going','Ecstatic','Edible','Educated','Elaborate','Elastic','Elated','Elderly','Electric','Elegant','Elementary','Elliptical','Embarrassed','Embellished','Eminent','Emotional','Empty','Enchanted','Enchanting','Energetic','Enlightened','Enormous','Enraged','Entire','Envious','Equal','Equatorial','Essential','Esteemed','Ethical','Euphoric','Even','Evergreen','Everlasting','Every','Evil','Exalted','Excellent','Excitable','Excited','Exciting','Exemplary','Exhausted','Exotic','Expensive','Experienced','Expert','Extra-Large','Extra-Small','Extraneous','Extroverted','Fabulous','Failing','Faint','Fair','Faithful','Fake','False','Familiar','Famous','Fancy','Fantastic','Far','Far-Flung','Far-Off','Faraway','Fast','Fat','Fatal','Fatherly','Favorable','Favorite','Fearful','Fearless','Feisty','Feline','Few','Fickle','Filthy','Fine','Finished','Firm','First','Firsthand','Fitting','Fixed','Flaky','Flamboyant','Flashy','Flat','Flawed','Flawless','Flickering','Flimsy','Flippant','Flowery','Fluffy','Fluid','Flustered','Focused','Fond','Foolhardy','Foolish','Forceful','Forked','Formal','Forsaken','Forthright','Fortunate','Fragrant','Frail','Frank','Frayed','Free','French','Frequent','Fresh','Friendly','Frightened','Frightening','Frigid','Frilly','Frivolous','Frizzy','Front','Frosty','Frozen','Frugal','Fruitful','Full','Fumbling','Functional','Funny','Fussy','Fuzzy','Gargantuan','Gaseous','General','Generous','Gentle','Genuine','Giant','Giddy','Gifted','Gigantic','Giving','Glamorous','Glaring','Glass','Gleaming','Gleeful','Glistening','Glittering','Gloomy','Glorious','Glossy','Glum','Golden','Good','Good-Natured','Gorgeous','Graceful','Gracious','Grand','Grandiose','Granular','Grateful','Grave','Gray','Great','Greedy','Green','Gregarious','Grim','Grimy','Gripping','Grizzled','Gross','Grotesque','Grouchy','Grounded','Growing','Growling','Grown','Grubby','Gruesome','Grumpy','Guilty','Gullible','Gummy','Hairy','Half','Handmade','Handsome','Handy','Happy','Happy-Go-Lucky','Hard','Hard-To-Find','Harmful','Harmless','Harmonious','Harsh','Hasty','Hateful','Haunting','Healthy','Heartfelt','Hearty','Heavenly','Heavy','Hefty','Helpful','Helpless','Hidden','Hideous','High','High-Level','Hilarious','Hoarse','Hollow','Homely','Honest','Honorable','Honored','Hopeful','Horrible','Hospitable','Hot','Huge','Humble','Humiliating','Humming','Humongous','Hungry','Hurtful','Husky','Icky','Icy','Ideal','Idealistic','Identical','Idiotic','Idle','Idolized','Ignorant','Ill','Ill-Fated','Ill-Informed','Illegal','Illiterate','Illustrious','Imaginary','Imaginative','Immaculate','Immaterial','Immediate','Immense','Impartial','Impassioned','Impeccable','Imperfect','Imperturbable','Impish','Impolite','Important','Impossible','Impractical','Impressionable','Impressive','Improbable','Impure','Inborn','Incomparable','Incompatible','Incomplete','Inconsequential','Incredible','Indelible','Indolent','Inexperienced','Infamous','Infantile','Infatuated','Inferior','Infinite','Informal','Innocent','Insecure','Insidious','Insignificant','Insistent','Instructive','Insubstantial','Intelligent','Intent','Intentional','Interesting','Internal','International','Intrepid','Ironclad','Irresponsible','Irritating','Itchy','Jaded','Jagged','Jam-Packed','Jaunty','Jealous','Jittery','Joint','Jolly','Jovial','Joyful','Joyous','Jubilant','Judicious','Juicy','Jumbo','Jumpy','Junior','Juvenile','Kaleidoscopic','Keen','Key','Kind','Kindhearted','Kindly','Klutzy','Knobby','Knotty','Knowing','Knowledgeable','Known','Kooky','Kosher','Lame','Lanky','Large','Last','Lasting','Late','Lavish','Lawful','Lazy','Leading','Leafy','Lean','Left','Legal','Legitimate','Light','Lighthearted','Likable','Likely','Limited','Limp','Limping','Linear','Lined','Liquid','Little','Live','Lively','Livid','Loathsome','Lone','Lonely','Long','Long-Term','Loose','Lopsided','Lost','Loud','Lovable','Lovely','Loving','Low','Loyal','Lucky','Lumbering','Luminous','Lumpy','Lustrous','Luxurious','Mad','Made-Up','Magnificent','Majestic','Major','Mammoth','Married','Marvelous','Massive','Mature','Meager','Mealy','Mean','Measly','Meaty','Medical','Mediocre','Medium','Meek','Mellow','Melodic','Memorable','Menacing','Merry','Messy','Metallic','Mild','Milky','Mindless','Miniature','Minor','Minty','Miserable','Miserly','Misguided','Misty','Mixed','Modern','Modest','Moist','Monstrous','Monthly','Monumental','Moral','Mortified','Motherly','Motionless','Mountainous','Muddy','Muffled','Multicolored','Mundane','Murky','Mushy','Musty','Muted','Mysterious','Naive','Narrow','Nasty','Natural','Naughty','Nautical','Near','Neat','Necessary','Needy','Negative','Neglected','Negligible','Neighboring','Nervous','New','Next','Nice','Nifty','Nimble','Nippy','Nocturnal','Noisy','Nonstop','Normal','Notable','Noted','Noteworthy','Novel','Noxious','Numb','Nutritious','Nutty','Obedient','Obese','Oblong','Oblong','Obvious','Occasional','Odd','Oddball','Offbeat','Offensive','Official','Oily','Old','Old-Fashioned','Only','Open','Optimal','Optimistic','Opulent','Orange','Orderly','Ordinary','Organic','Original','Ornate','Ornery','Outgoing','Outlandish','Outlying','Outrageous','Outstanding','Oval','Overcooked','Overdue','Overjoyed','Overlooked','Palatable','Pale','Paltry','Parallel','Parched','Partial','Passionate','Past','Pastel','Peaceful','Peppery','Perfect','Perfumed','Periodic','Perky','Personal','Pertinent','Pesky','Pessimistic','Petty','Phony','Physical','Piercing','Pink','Pitiful','Plain','Plaintive','Plastic','Playful','Pleasant','Pleased','Pleasing','Plump','Plush','Pointed','Pointless','Poised','Polished','Polite','Political','Poor','Popular','Portly','Posh','Positive','Possible','Potable','Powerful','Powerless','Practical','Precious','Precious','Present','Prestigious','Pretty','Previous','Pricey','Prickly','Primary','Prime','Pristine','Private','Prize','Probable','Productive','Profitable','Profuse','Proper','Proud','Prudent','Punctual','Pungent','Puny','Pure','Purple','Pushy','Putrid','Puzzled','Puzzling','Quaint','Qualified','Quarrelsome','Quarterly','Queasy','Querulous','Questionable','Quick','Quick-Witted','Quiet','Quintessential','Quirky','Quixotic','Quizzical','Radiant','Ragged','Rapid','Rare','Rash','Raw','Ready','Real','Realistic','Reasonable','Recent','Reckless','Rectangular','Red','Reflecting','Regal','Regular','Reliable','Relieved','Remarkable','Remorseful','Remote','Repentant','Repulsive','Required','Respectful','Responsible','Revolving','Rewarding','Rich','Right','Rigid','Ringed','Ripe','Roasted','Robust','Rosy','Rotating','Rotten','Rough','Round','Rowdy','Royal','Rubbery','Ruddy','Rude','Rundown','Runny','Rural','Rusty','Sad','Safe','Salty','Same','Sandy','Sane','Sarcastic','Sardonic','Satisfied','Scaly','Scarce','Scared','Scary','Scented','Scholarly','Scientific','Scornful','Scratchy','Scrawny','Second','Second-Hand','Secondary','Secret','Self-Assured','Self-Reliant','Selfish','Sentimental','Separate','Serene','Serious','Serpentine','Several','Severe','Shabby','Shadowy','Shady','Shallow','Shameful','Shameless','Sharp','Shimmering','Shiny','Shocked','Shocking','Shoddy','Short','Short-Term','Showy','Shrill','Shy','Sick','Silent','Silky','Silly','Silver','Similar','Simple','Simplistic','Sinful','Single','Sizzling','Skeletal','Skinny','Sleepy','Slight','Slim','Slimy','Slippery','Slow','Slushy','Small','Smart','Smoggy','Smooth','Smug','Snappy','Snarling','Sneaky','Sniveling','Snoopy','Sociable','Soft','Soggy','Solid','Somber','Some','Sophisticated','Sore','Sorrowful','Soulful','Soupy','Sour','Spanish','Sparkling','Sparse','Specific','Spectacular','Speedy','Spherical','Spicy','Spiffy','Spirited','Spiteful','Splendid','Spotless','Spotted','Spry','Square','Squeaky','Squiggly','Stable','Staid','Stained','Stale','Standard','Starchy','Stark','Starry','Steel','Steep','Sticky','Stiff','Stimulating','Stingy','Stormy','Straight','Strange','Strict','Strident','Striking','Striped','Strong','Studious','Stunning','Stupendous','Stupid','Sturdy','Stylish','Subdued','Submissive','Substantial','Subtle','Suburban','Sudden','Sugary','Sunny','Super','Superb','Superficial','Superior','Supportive','Sure-Footed','Surprised','Suspicious','Svelte','Sweaty','Sweet','Sweltering','Swift','Sympathetic','Talkative','Tall','Tame','Tan','Tangible','Tart','Tasty','Tattered','Taut','Tedious','Teeming','Tempting','Tender','Tense','Tepid','Terrible','Terrific','Testy','Thankful','That','These','Thick','Thin','Third','Thirsty','This','Thorny','Thorough','Those','Thoughtful','Threadbare','Thrifty','Thunderous','Tidy','Tight','Timely','Tinted','Tiny','Tired','Torn','Total','Tough','Tragic','Trained','Traumatic','Treasured','Tremendous','Tremendous','Triangular','Tricky','Trifling','Trim','Trivial','Troubled','Trusting','Trustworthy','Trusty','Truthful','Tubby','Turbulent','Twin','Ugly','Ultimate','Unacceptable','Unaware','Uncomfortable','Uncommon','Unconscious','Understated','Unequaled','Uneven','Unfinished','Unfit','Unfolded','Unfortunate','Unhappy','Unhealthy','Uniform','Unimportant','Unique','United','Unkempt','Unknown','Unlawful','Unlined','Unlucky','Unnatural','Unpleasant','Unrealistic','Unripe','Unruly','Unselfish','Unsightly','Unsteady','Unsung','Untidy','Untimely','Untried','Untrue','Unused','Unusual','Unwelcome','Unwieldy','Unwilling','Unwitting','Unwritten','Upbeat','Upright','Upset','Urban','Usable','Used','Useful','Useless','Utilized','Utter','Vacant','Vague','Vain','Valid','Valuable','Vapid','Variable','Vast','Velvety','Venerated','Vengeful','Verifiable','Vibrant','Vicious','Victorious','Vigilant','Vigorous','Villainous','Violent','Violet','Virtual','Virtuous','Visible','Vital','Vivacious','Vivid','Voluminous','Wan','Warlike','Warm','Warmhearted','Warped','Wary','Wasteful','Watchful','Waterlogged','Watery','Wavy','Weak','Wealthy','Weary','Webbed','Wee','Weekly','Weepy','Weighty','Weird','Welcome','Well-Documented','Well-Groomed','Well-Informed','Well-Lit','Well-Made','Well-Off','Well-To-Do','Well-Worn','Wet','Which','Whimsical','Whirlwind','Whispered','White','Whole','Whopping','Wicked','Wide','Wide-Eyed','Wiggly','Wild','Willing','Wilted','Winding','Windy','Winged','Wiry','Wise','Witty','Wobbly','Woeful','Wonderful','Wooden','Woozy','Wordy','Worldly','Worn','Worried','Worrisome','Worse','Worst','Worthless','Worthwhile','Worthy','Wrathful','Wretched','Writhing','Wrong','Wry','Yawning','Yearly','Yellow','Yellowish','Young','Youthful','Yummy','Zany','Zealous','Zesty','Zigzag']};

//******************after declaring all variables, check for save data + load, if none execute a save***************
function initialLoadSave(){
    if(localStorage.getItem("ceodata") === null){
        save();
		showAfterLoad();
    }
    else if(loadOnStart === true){
        load();
    }
}

//****************save and load functions**********************
function load(){
    var loaded = localStorage.getItem("ceodata");
    player = JSON.parse(loaded);
	bank= player.bank;
	salary= player.salary;
	boxsale= player.boxsale;
	boxcost= player.boxcost;
	neworders = player.neworders;
	openorders = player.openorders;
	lastsold = player.lastsold;
	ef = player.ef;
	stock = player.stock;
	time = player.time;
	pdp = player.pdp;
	demand = player.demand;
	sparks = player.sparks;
	stress = player.stress;
	staff = player.staff;  //totalizer for all staff
	fizz = player.fizz;
	tech = player.tech;
	cerealname = player.cerealname;
	unlocks = player.unlocks;
	totalboxesshipped=totalboxesshipped;
	profityesterday=profityesterday;
	workers = player.workers;
	marketers = player.marketers;
	engineers = player.engineers;
	receivers = player.receivers;
	inspectors = player.inspectors;
	grinders = player.grinders;
	mixers = player.mixers;
	ovens = player.ovens;
	dryers = player.dryers;
	toasters = player.toasters;
	frosters = player.frosters;
	packers = player.packers;
	shippers = player.shippers;
	factories = player.factories;
	warehouses = player.warehouses;
	toys = player.toys;
	research = player.research;
	recipe = player.recipe;
	ingredients = player.ingredients;
	pantry = player.pantry;
	mascot.name = player.mname;
	camps_active = player.camps_active;
	camps_funded = player.camps_funded;
	showAfterLoad();
}

function save(){
	player.bank=bank;
	player.salary=salary;
	player.boxsale=boxsale;
	player.boxcost=boxcost;
	player.neworders = neworders;
	player.openorders = openorders;
	player.lastsold = lastsold;
	player.ef = ef;
	player.stock = stock;
	player.time = time;
	player.pdp = pdp;
	player.demand = demand;
	player.sparks = sparks;
	player.stress = stress;
	player.staff = staff;  //totalizer for all staff
	player.fizz = fizz;
	player.tech = tech;
	player.cerealname = cerealname;
	player.unlocks = unlocks;
	player.totalboxesshipped=totalboxesshipped;
	player.profityesterday=profityesterday;
	player.workers = workers;
	player.marketers = marketers;
	player.engineers = engineers;
	player.receivers = receivers;
	player.inspectors = inspectors;
	player.grinders = grinders;
	player.mixers = mixers;
	player.ovens = ovens;
	player.dryers = dryers;
	player.toasters = toasters;
	player.frosters = frosters;
	player.packers = packers;
	player.shippers = shippers;
	player.factories = factories;
	player.warehouses = warehouses;
	player.toys = toys;
	player.research = research;
	player.recipe = recipe;
	player.ingredients = ingredients;
	player.pantry = pantry;
	player.mname = mascot.name;
	player.camps_active = camps_active;
	player.camps_funded = camps_funded;
	//TODO pop up a save message
    localStorage.setItem("ceodata",JSON.stringify(player));
}

function manualsave(){
	save();
	$('#savemessageanimation').remove();
	$('#savemessage').html('<div class="col-sm-6 anisave" id="savemessageanimation">Saved!</div>');
}

function newgame(){
    if (confirm("WARNING! This will delete your save file and take you back to the beginning!  Are you sure you want to do this?") == true) {
        localStorage.removeItem("ceodata");
		location.reload(true);
    }
}

function autosave(){
	autosavecounter++;
	if (autosavecounter > 8){
		save();
		autosavecounter=0;
	}
}

function showCheats(){
	$('#adminbuttons').append('<button class="btn btn-primary" onmousedown="beg()">Beg</button><button class="btn btn-primary" onmousedown="cheat()">Cheat</button>');
}

//******************OBJECT BUILDING**************************


/*
*****************************************************************************
**********************************MARKETING**********************************
*****************************************************************************
*/

var marketboost = 1;

function marketsObject(names,fizzcosts,costs,desc,boostdesc){this.names=names; this.fizzcosts=fizzcosts; this.costs=costs; this.desc=desc; this.boostdesc=boostdesc; this.buttons=[];
	for (m=0; m<names.length; m++){
		this.buttons[m]='<div class="row"><div class="col-sm-6 btnholder" id="marketbuttondiv'+m+'"><button class="btn btn-primary btn-block" id="marketbutton'+m+'" onclick="buyMarket('+m+')">'+
			prettify(fizzcosts[m])+'<span class="glyphicon glyphicon-certificate"></span><br>$'+prettify(costs[m])+
			'</button></div><div class="col-sm-6" id="marketbuttondesc'+m+'">'+desc[m]+'<br><small>Demand: '+boostdesc[m]+'</small></div></div>';
	}
}

var markets = new marketsObject(['namecereal','boxart','jingle','mascot'],
[100,500,2500,10000],[100,2500,5000,10000],['Name the Cereal','Design Box Art','Write a Jingle','Create a Mascot'],
[' x 1.5',' x 3',' x 4',' x 5']); 

/*
var markets = new marketsObject(['namecereal','boxart','jingle','mascot','newspaper','radio','internet','tv','superbowl'],
[100,500,2500,10000,25000,50000,100000,250000,1000000],[100,2500,5000,10000,50000,100000,250000,1000000,5000000],
['Name the Cereal','Design Box Art','Write a Jingle','Create a Mascot','Run Newspaper Ad','Record Radio Ad',
'Internet Advertising','Film a TV Commercial','Film a Superbowl Commercial'],['+2 All Groups<br>Having a name: 10% boost','+16 All Groups','+80 All Groups',
'+800 Child and Teen','+2,400 Adult and Elderly','+6,400 Adult and Elderly','+16,000 Child and Teen','+10% to Lowest Group','+10% to All Groups']); //paste all the marketactives into here
*/

function campObject(name,fizzcost,cost,boost,benefit){
	this.name=name;
	this.fizzcost=fizzcost;
	this.cost=cost;
	this.boost=boost;
	this.benefit=benefit;
}

var camp = [];  //shouldn't need to save this
camp[0] = new campObject('Flyers',15,1000,[5,5,5,0],'CTA x 5');
camp[1] = new campObject('Direct mail',15,1000,[0,5,5,5],'TAE x 5');
camp[2] = new campObject('Email',30,2500,[10,10,0,0],'CT x 10');
camp[3] = new campObject('Magazine',30,10000,[15,15,0,0],'CT x 15');
camp[4] = new campObject('Newspaper',30,25000,[0,0,15,15],'AE x 15');
camp[5] = new campObject('Billboard',40,50000,[10,10,10,10],'CTAE x 10');
camp[6] = new campObject('Radio',50,100000,[0,0,25,25],'AE x 25');
camp[7] = new campObject('Contest',50,100000,[30,30,0,0],'CT x 30');
camp[8] = new campObject('Telemarketing',75,250000,[0,0,37.5,37.5],'AE x 37.5');
camp[9] = new campObject('Internet',100,500000,[25,25,25,25],'CTAE x 25');
camp[10] = new campObject('TV',200,1000000,[50,50,50,50],'CTAE x 50');



/*
*****************************************************************************
**********************************UPGRADES***********************************
*****************************************************************************
*/

function upgradeObject(upgradetype,category,objname,n,costs,ef,staff,stock,requires,flavor) {this.upgradetype = upgradetype; this.category = category; this.objname = objname;
 this.n = n; this.costs = costs; this.ef=ef; this.staff=staff; this.stock=stock; this.index = 1; this.openupgrades = 0; this.current = []; 
 this.next = []; this.requires=requires; this.unlocked=[]; this.flavor = flavor;
 for (i=0; i<n.length; i++){
	 
	 var benefit;
	 if (this.upgradetype == 'factory'){
			//benefit = 'Max Staff+ '+this.staff[i];
			benefit = 'Max Staff: '+this.staff[i];
		}
		else if (this.upgradetype == 'warehouse'){
			//benefit = 'Max Stock+ '+abbreviate(this.stock[i],false);
			benefit = 'Max Stock: '+abbreviate(this.stock[i],false);
		}
		else{
			//benefit = 'EF+ '+prettify(this.ef[i]);
			benefit = prettify(this.ef[i]) + ' BPH'; 
		}
	 
	 this.current[i] = '<span id="c_'+this.objname+i+'"><div class="row"><h5>'+this.n[i]+
	 '</h5></div><div class="row"><h6>'+benefit+'</h6></div><div class="row"><i><small>'+this.flavor[i]+'</small></i></div></span>';
	 
/*	 	 this.current[i] = '<span id="c_'+this.objname+i+'"><div class="row">'+this.n[i]+
	 '</div><div class="row">EF+'+this.ef[i]+'</div><div class="row"><i>Flavor text</i></div></span>';
*/
	 if (requires[i]==0){		//set whether things are unlocked by default or have a research requirement
		 this.unlocked[i]=1;
	 }
	 else{
		 this.unlocked[i]=0;
	 }
 }
}

var ucosts = [0,50,250,2500,25000,50000,125000,250000,500000,1000000,5000000,10000000,0];
//var uefs = [0,1,2,4,8,16,32,64,128,256,512,1024,0];
var uefs = [0,1,5,25,100,500,1000,5000,10000,25000,100000,625000,0];
var uzero = [0,0,0,0,0,0,0,0,0,0,0,0,0];
//var ustaff = [0,5,5,10,10,15,15,20,20,25,25,45,0];
var ustaff = [5,10,15,25,35,50,65,85,100,125,150,200,0];
//var ustock = [0,900,4000,5000,15000,25000,50000,150000,250000,500000,99000000,900000000,0];
var ustock = [100,2500,10000,250000,1000000,5000000,10000000,50000000,100000000,250000000,1000000000,10000000000,0];

var receivers = new upgradeObject('manufacturing','Receiving','receivers',['By Hand', 'Plastic bucket', 'Double metal buckets', 'Wheelbarrow', 'Pallet jack', 
'Fork truck', 'Loading truck', 'Loading bay', 'Super loading bay', 'Conveyor belt unloading',
'Automated receiving', 'Robotic receiving', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,0,7,0,13,0,18,20,17,30,31],
['A scoop at a time','Can build sand castles, too','Double damage!','Wheel powerful','Now we can lift entire pallets',
'Two tines, yet called a fork?','Keep on truckin\'','Receive all the things!','Like the loading bay, but 16-bit',
'Conveyors make everything better','It was a hassle anyways','0100000101001001',]);

var inspectors = new upgradeObject('manufacturing','Inspecting','inspectors',['Naked eye', 'Reader glasses', 'Prescription glasses', 'Lasix', 'Microscope inspection',
'Electronic inspection', 'Laser inspection', 'Computer analysis', 'Automated inspection', 'Robotic optics',
'Predictive inspection', 'Scrying inspection', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,12,25,10,15,18,19,30,31,34,41],
['<br>']);

var grinders = new upgradeObject('manufacturing','Grinding','grinders',['By hand', 'Rolling pin', 'Hand grinders', 'Pneumatic grinders', 'Grinding rollers',
'Stainless rollers','Industrial rollers','Industrial stainless rollers', 'Pressure controlled rollers', 'Titanium rollers',
'Diamond rollers', 'Adamantium rollers', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,0,9,14,16,18,19,20,27,32,35],
['<br>']);

var mixers = new upgradeObject('manufacturing','Mixing','mixers',['By hand', 'Mixing bowl', 'Basic cooking utensils', 'Kitchen Aid mixers', 'Commercial mixer', 
'Mechanized batch mixer', 'Mass balanced mixing', 'Precision logic mixers', 'Industrial mixing chamber', 'Vortex mixing tunnel',
'Seismic shakers', 'Quantum disruptors', 'Maxed!'], ucosts, uefs,uzero,uzero,
[0,0,0,10,18,30,19,25,20,24,33,36],
['Like Mama\'s cooking','<br>','To pass that health inspection','<br>','Like a real business',
'Mechamixin\'','Massively mixed','<br>','Normally used to mix nuclear fuel',
'Tornado inspired','Shake it like an earthquake','Mixed beyond our ability to analyze',]);

var ovens = new upgradeObject('manufacturing','Cooking','ovens',['Old used oven', 'Repaired oven thermostat', 'Overhaul oven', 'Commercial oven', 'Deluxe commerical oven',
'Deluxe double oven','Industrial oven','High temperature oven', 'Industrial pressure cooker', 'Automated oven',
'Nuclear heated oven', 'Fusion heated oven', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,10,21,16,19,20,22,27,30,23,26],
['<br>']);

var dryers = new upgradeObject('manufacturing','Drying','dryers',['Air dry', 'Hand fan', 'Blow dryer', 'Automatic blow dryer', 'Articulating dryers',
'Multilayer dryers','Sensor based drying', 'Industrial fluffing machine','Selective drying', 'H2O molecular lasers',
'Drone mounted blowers', 'Quantum moisture separators', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,10,15,17,12,19,20,30,25,31,36],
['<br>']);

var toasters = new upgradeObject('manufacturing','Toasting','toasters',['None', 'Cheap toaster', 'Toaster oven', 'Commercial toaster oven', 'Industrial toaster oven',
'Automated industrial oven','Flamethrower toasting', 'Flame robots', 'Controlled explosion toasting', 'Solar flare generator',
'Toasting death ray', 'Photon toasterpedos', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,10,18,20,30,21,31,22,28,38,39],
['<br>']);

var frosters = new upgradeObject('manufacturing','Frosting','frosters',['None', 'Frosting brush', 'Hand sprayers', 'Pneumatic frosters', 'Hydraulic frosting dispensers',
'Automated coating process', 'Frosting grenades', 'Frosting conveyor waterfall', 'Automated drone frosting', 'Flying nanofrosting bots',
'Levitated cereal frosting application', 'Time rift frost injection', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,0,9,14,30,22,17,31,29,38,40],
['<br>']);

var packers = new upgradeObject('manufacturing','Packing','packers',['By hand', 'Basic hand tools', 'Box maker', 'Box inkjet printer', 'Conveyor box filling',
'Volume sensed packaging', 'High speed laser box printer', 'Robotic box assembly', 'Robotic packaging', 'Artifically intelligent box printer',
'Forcefield controlled packaging', 'Miniature wormhole tunnel packaging', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,10,15,17,19,20,30,31,34,38,42],
['<br>']);

var shippers = new upgradeObject('manufacturing','Shipping','shippers',['Hand delivery', 'Used bike', 'Messenger bike', 'Moped', 'Car',
'Commercial van', 'Delivery truck', 'Semi loading bay', 'Boat loading dock', 'Stealth drone plane delivery',
'Robotic bee swarm delivery', 'Direct box teleportation delivery', 'Maxed!'],ucosts,uefs,uzero,uzero,
[0,0,0,7,13,16,14,18,20,29,31,37],
['<br>']);

var factories = new upgradeObject('factory','Factory','factories',['Mom\'s Kitchen', 'Commercial Kitchen', 'Small Office', 'Large Office', 'Shared Industrial Complex',
'Starter Factory', 'Large Factory', 'Industrial Food Factory', 'Mega Factory', 'Self-contained Work City',
'Multi-national Factories', 'Earth Orbiting Factory', 'Maxed!'],
[0,5000,25000,50000,250000,1000000,2500000,5000000,10000000,25000000,50000000,100000000,0],uzero,ustaff,uzero,
[0,0,0,9,14,17,19,20,32,31,29,39],
['Birthplace of many a business','<br>']);

var warehouses = new upgradeObject('warehouse','Warehouse','warehouses',['Mom\'s Basement', 'Rental Storage Unit', 'Trailer', 'Stock Room', 'Basic Warehouse',
'Modern Warehouse', 'Industrial Scale Warehouse', 'Distribution Center', 'Multi-national Distribution', 'Vertical Skyscraper Storage Complex',
'Space Station Warehouses', 'Multiverse Dimensional Portal Storage', 'Maxed!'],
[0,500,2500,5000,25000,100000,250000,500000,1000000,2500000,50000000,10000000,0],uzero,uzero,ustock,
[0,0,7,15,18,19,20,30,33,35,39,42],
['You gotta start somewhere!',
'<br>']);


/*
*****************************************************************************
************************************TOYS*************************************
*****************************************************************************
*/

function toysObject(names,costs,reductions){
	this.names=names; this.costs=costs; this.reductions=reductions; this.buttons=[]; this.allrevealed=false; this.bought=[];
	for (i=0; i<names.length; i++){
			this.buttons[i]='<div class="col-sm-6 btnholder" id="toybuttonrow'+i+'"><button class="btn btn-primary btn-block" id="toybutton'+i+'" onclick="buyToy('+i+')"><h5>'+
			names[i]+'</h5>$'+prettify(costs[i])+'<br>Stress: -'+reductions[i]+' <small><span class="glyphicon glyphicon-alert"></span></small>/hr</button></div>';
			this.bought[i]=0;
		}
}



var toys = new toysObject(['Potted plant','Video game collection','Power recliner','Pinball machine','Pet','Start a hobby','Home theater','Above ground pool','Basketball court',
'Hot tub','Jet ski','Motorcycle','In-ground pool','Home movie theater','Designer furniture','Speed boat','Sports car','Luxury car','Tennis court','Backyard fountain',
'Personal limousine','Art collection','Simple home','Build a custom home','Fancy outdoor gardens','Yacht','High-end sports car','Mansion','Private island',
'Private jet','Supermansion','Superyacht'],
[20,600,1250,2500,2500,2500,3000,5000,8000,8000,10000,17500,25000,25000,30000,30000,35000,70000,75000,100000,200000,
200000,250000,750000,1000000,3000000,4500000,8000000,25000000,50000000,200000000,300000000],
//[0.5,1,2,2,2,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,7,7,8,8,9,10,12,15,20,25]
[0.5,0.5,0.5,1,1,1,1.5,2,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,30,40,45,50]

);
//possibly add requirements for some of these (ie cant build a pool until you own a home, etc.)


/*
*****************************************************************************
**********************************RESEARCH***********************************
*****************************************************************************
*/

var rlist = {names:['Physics','Drying','Nuclear Physics','Kinematics','Inspecting','Electromagnetism','Toasting','Wheels','Grinding','Pneumatics','Circuits','Frosting',
'Optics','Vehicles','Hydraulics','Computing','Metallurgy','Conveyor Belts','Commercial Tech','Instrumentation','Industrial Tech','Pyrotechnics','Explosives',
'Nuclear Fission','Jet Propulsion','Lasers','Fusion','Titanium Alloys','Advanced Optics','Flight','Automation','Robotics','Diamond Cutting','Tectonics','AI',
'Indestructible Alloys','Quantum Mechanics','Teleportation','Anti-gravity','Space Travel','Time Manipulation','Spice','Dimensional Portals'],
techcost:[10,15,20,25,35,50,50,75,100,125,150,200,250,300,500,500,750,1000,1250,1500,2000,2500,3000,5000,7500,10000,15000,20000,25000,30000,35000,
40000,45000,50000,75000,100000,125000,150000,200000,250000,500000,750000,1000000],
requires:[['Start'],['Physics'],['Physics'],['Physics'],['Drying'],['Physics'],['Drying'],['Kinematics'],['Wheels'],['Kinematics'],['Electromagnetism'],['Toasting'],
['Inspecting'],['Grinding'],['Pneumatics'],['Circuits'],['Grinding'],['Circuits'],['Computing'],['Commercial Tech'],['Conveyor Belts', 'Hydraulics', 'Instrumetation'],
['Toasting'],['Pyrotechnics'],['Nuclear Physics'],['Pyrotechnics'],['Optics'],['Nuclear Fission'],['Metallurgy'],['Lasers'],
['Instrumetation', 'Jet Propulsion', 'Vehicles', 'Titanium Alloys'],['Computing'],['Automation'],['Titanium Alloys'],['Nuclear Fission', 'Explosives'],
['Robotics'],['Diamond Cutting'],['Nuclear Fission'],['Quantum Mechanics'],['Quantum Mechanics'],['Flight', 'Advanced Optics'],
['Anti-gravity'],['Space Travel'],['Time Manipulation', 'Teleportation', 'Space Travel']],
reqnumbers:[[],[0],[0],[0],[1],[0],[1],[3],[7],[3],[5],[6],[4],[8],[9],[10],[8],[10],[15],[18],[17,14,19],
[6],[21],[2],[21],[12],[23],[16],[25],[19,24,13,27],[15],[30],[27],[23,22],[31],[32],[23],[36],[36],[29,28],[38],[39],[39,40,37]],
leadsto:[
['Leads to: Drying, Nuclear Physics, Kinematics, Electromagnetism'],
['Leads to: Inspecting, Toasting'],
['Leads to: Nuclear Fission'],
['Leads to: Wheels, Pneumatics'],
['Leads to: Optics'],
['Leads to: Circuits'],
['Leads to: Frosting, Pyrotechnics'],
['Leads to: Grinding'],
['Leads to: Vehicles'],
['Leads to: Hydraulics'],
['Leads to: Computing, Conveyor Belts'],
[''],
['Leads to: Lasers'],
['Leads to: Flight'],
['Leads to: Industrial Tech'],
['Leads to: Commercial Tech, Automation'],
['Leads to: Titanium Alloys'],
['Leads to: Industrial Tech'],
['Leads to: Instrumentation'],
['Leads to: Industrial Tech, Flight'],
[''],
['Leads to: Explosives, Jet Propulsion, Tectonics'],
['Leads to: Fusion, Tectonics'],
['Leads to: Fusion'],
['Leads to: Flight'],
['Leads to: Advanced Optics'],
[''],
['Leads to: Flight, Diamond Cutting'],
['Leads to: Space Travel'],
['Leads to: Space Travel'],
['Leads to: Robotics'],
['Leads to: AI'],
['Leads to: Indestructible Alloys'],
[''],
[''],
[''],
['Leads to: Teleportation, Anti-gravity'],
['Leads to: Dimensional Portals'],
['Leads to: Time Manipulation'],
['Leads to: Spice'],
['Leads to: Dimensional Portals'],
[''],
['']]};

var research = [];

function researchObject(name,techcost,requires,r,reqnumbers,leadsto){
	this.name = name;
	this.techcost = techcost;
	this.r = r;
	this.researched = 0;
	this.requires = requires;
	this.leadsto = leadsto;
	this.visible = 0;	//easy way to decide if visible would be if purchaseable, but this gives no clue to the player what they should work on
						// instead, make visible if purchaseable OR if first level child of purchased research ?
	this.disabled = 1;	//disable the button to research if can't afford tech cost OR if parent research not researched yet
						//this will require regular checking (via MOL) whether to disable or enable buttons
						//possibly change text to red for the requirement not met  TODO

	this.rbutton = '<div class="col-sm-12 btnholder" id="researchbuttondiv'+r+'"><button class="btn btn-primary btn-block" id="researchbutton'+r+
	'" onclick="buyResearch('+r+')"><h5>'+name+'</h5>Cost: '+ prettify(techcost)+'<span class="glyphicon glyphicon-cog"></span><br><small>'+leadsto+'</small></button></div>';	

	this.reqnumbers = reqnumbers;
}

for (r=0; r<rlist.names.length; r++){	//build array of research objects
		research[r] = new researchObject(rlist.names[r],rlist.techcost[r],rlist.requires[r],r,rlist.reqnumbers[r],rlist.leadsto[r]);
}

function buildUpgradeButtons(u){
	for (i=0; i<u.requires.length-1; i++){	//have to build this guy after research is declared...oh well.
	//	console.log('Research# '+u.requires[i]);
	//	console.log(' aka '+research[u.requires[i]].name);
	//	u.nextreqs[i] = '<span id="nr_'+u.objname+(i+1)+'"><div class="row">'+u.n[i+1]+'</div><div class="row">Requires: '+research[u.requires[i+1]].name+'</div></span>';

		var r_req = u.requires[i+1] == 0 ? '<div class="row" id="n_'+u.objname+'_requires'+(i+1)+'">&nbsp;</div>' :
		'<div class="row" style="color:yellow;" id="n_'+u.objname+'_requires'+(i+1)+'">Requires: '+research[u.requires[i+1]].name+'</div>'; //show requirement text as blank or not
		
		/* doesn't appear i am using benefit here
		var benefit;    //benefit text based on upgrade type
		if (u.upgradetype == 'factory'){
			benefit = 'Max Staff +'+u.staff[i+1];
		}
		else if (u.upgradetype == 'warehouse'){
			benefit = 'Max Stock +'+abbreviate(u.stock[i+1],false);
		}
		else{
			benefit = 'EF +'+prettify(u.ef[i+1]);
		}
		*/
		
		u.next[i] = '<div class="col-sm-6 smallpad" id="n_'+u.objname+'_row'+(i+1)+'"><button class="btn btn-primary btn-block" id="n_'+u.objname+(i+1)+'" onclick="buyUpgrade('+u.objname+','+(i+1)+')"><div class="row"><h5>'+
		u.n[i+1]+'</h5></div><div class="row"><h6>Cost: $'+prettify(u.costs[i+1])+'</h6></div><small>'+r_req+'</small></button></div>';

	}
}

buildUpgradeButtons(receivers);
buildUpgradeButtons(inspectors);
buildUpgradeButtons(grinders);
buildUpgradeButtons(mixers);
buildUpgradeButtons(ovens);
buildUpgradeButtons(dryers);
buildUpgradeButtons(toasters);
buildUpgradeButtons(frosters);
buildUpgradeButtons(packers);
buildUpgradeButtons(shippers);
buildUpgradeButtons(factories);
buildUpgradeButtons(warehouses);

	
/*
*****************************************************************************
*********************************INGREDIENTS*********************************
*****************************************************************************
*/
var ingredients = [];
var pantry,recipe;
var ingrlist = {names:['','Bran','Protein','Vitamins','Wheat','Oats','Pecans','Almonds','Corn Flakes','Raisins','Cranberry','Apple','Coconut','Strawberry','Vanilla',
'Cinnamon','Cherry','Blueberry','Raspberry','Orange','Honey','Maple','Peanut Butter','Chocolate','Brown Sugar','Marshmallows','Sugar','Cookies'],
health:[0,95,100,100,95,85,85,85,80,75,70,60,60,50,50,50,50,50,50,50,15,15,15,5,5,0,0,0],taste:[0,5,0,0,5,15,15,15,20,25,30,40,40,50,50,50,50,50,50,50,85,85,85,95,95,100,100,100]};

function ingrObject(name,health,taste){this.name = name; this.health = health; this.taste = taste; this.show = 0;};

//randomize unlock order of ingredients for this game
function shuffle(a) {		//adapted from answer given by CoolAJ86 on stackoverflow, thanks!
  var ingzero = a.shift();	//strip the first two elements out so we don't shuffle those
  var ingone = a.shift();
  var currentIndex = a.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {		

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);	
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = a[currentIndex];
    a[currentIndex] = a[randomIndex];
    a[randomIndex] = temporaryValue;
  }
  a.unshift(ingone);	//add the first two elements back in to the beginning of the array
  a.unshift(ingzero);	//had to do this shift / unshift nonsense because trying to shuffle elements 2-27 only would result in occasional crashes

//  return a;
}

function initializePantry(){
	for (i=0; i<ingrlist.names.length; i++){	//build ingredients array, each element is an object containing name, health, and taste
		ingredients[i] = new ingrObject(ingrlist.names[i],ingrlist.health[i],ingrlist.taste[i]);
	}
	shuffle(ingredients);	//shuffle the ingredients (except 0-blank & 1-bran)
	ingredients[0].show = 1;//blank ingredient will be marked show
	ingredients[1].show = 1;
	
	//*************************************************************************************
	//build the pantry object which keeps track of how many ingredients are unlocked and the cost of the next unlock
	pantry = {ingredients,index:2,cost:100,newrecipecost:0,newrecipecostarray:[0,100,250,500,1000],nextrecipe:[0,0,0,0],
	row_cost:[0,1000,10000,25000,0], row_index:1, row_unlocked:[1,0,0,0]};	
	//*************************************************************************************
	
	//showIngredient(1);		//this should show both ingredient 0 (blank) and ingredient 1.  Only call this function once or bad things happen :(
	
	recipe = {current:[pantry.ingredients[0],pantry.ingredients[0],pantry.ingredients[0],pantry.ingredients[0]],	//build the recipe object
	next:[pantry.ingredients[0],pantry.ingredients[0],pantry.ingredients[0],pantry.ingredients[0]],health:0,taste:0,appeal:[0,0,0,0]};
	
	makeRecipe(pantry.ingredients[1],pantry.ingredients[0],pantry.ingredients[0],pantry.ingredients[0]);	//make the first recipe, bran cereal! yum?
}

function showIngredient(index){		//adds an ingredient to the dropdown menu for the next recipe
	if (pantry.ingredients[index].show == 0){
//		console.log('showing #'+index);
		var nextrecipehtml = '';
		pantry.ingredients[index].show = 1;
		$('#ownedingredients').append('<div class="row">'+pantry.ingredients[index].name+'</div>');
		for (j=0; j<pantry.ingredients.length; j++){
			if (pantry.ingredients[j].show == 1){
				nextrecipehtml+='<option value="'+j+'">'+pantry.ingredients[j].name+'</option>';
			}
		}
		$('.nextingrdrops').html(nextrecipehtml);
	}
}

function unlockIngr(){	//unlock the next (previously randomized) ingredient
	var scost = pantry.cost;
	if (scost <= sparks.current && pantry.index<pantry.ingredients.length){
		showIngredient(pantry.index);
		sparks.current -= scost;
		pantry.cost+=100;
		pantry.index++;
		$('#nextingr1').val(pantry.nextrecipe[0]);	//have to reinsert the selected ingredient into the dropdowns or they go blank
		$('#nextingr2').val(pantry.nextrecipe[1]);
		$('#nextingr3').val(pantry.nextrecipe[2]);
		$('#nextingr4').val(pantry.nextrecipe[3]);
		updateGUI();
	}
}

function unlockIngrRow(){	//unlock ingredient dropdown boxes (aka can have more ingredients)
	var scost = pantry.row_cost[pantry.row_index];
	if (scost <= sparks.current){
		sparks.current -= scost;
		//pantry.row_cost*=10;
		pantry.row_unlocked[pantry.row_index] = 1;
		pantry.row_index++;
		$('#ingredient'+(pantry.row_index)+'row').show();
		$('#nextingrrowcost').html(prettify(pantry.row_cost[pantry.row_index]));
		if (pantry.row_index>3){
			$('#recipe_complexity_button').hide();
		}
	}
}

function makeRecipe(a,b,c,d){
	recipe.current[0] = a;
	recipe.current[1] = b;
	recipe.current[2] = c;
	recipe.current[3] = d;
	
	recipe.health = a.health + 0.5*b.health + 0.25*c.health + .1*d.health;	//subsequent ingredients provide diminishing appeal & therefore diminishing demand boost..
	recipe.taste = a.taste + 0.5*b.taste + 0.25*c.taste + .1*d.taste;		//  this is kind of necessary because otherwise the exponential demand function blows up like crazy
	var rh = recipe.health;
	var rt = recipe.taste;
	var aha = agehealthappeals;
	var ata = agetasteappeals;
	for (i=0; i<=3; i++){
		recipe.appeal[i] = (rh*aha[i]+rt*ata[i]); //how much the current recipe appeals to children, teens, adults, elderly
	}
}

function updateRecipeCost(){
	var count=0;
	for (k=0; k<4; k++){
		if (pantry.nextrecipe[k] != 0){
			count++;	//for each non-blank ingredient, increment the index into the array of recipe costs (more ingredients costs more to make)
		}
	}
//	console.log('count is '+count);
	pantry.newrecipecost = pantry.newrecipecostarray[count];
	updateGUI();	//kind of bloated for updating one value..
}

function playerMakeRecipe(){
	if (confirm("Make new recipe? This will reset and remove marketing bonuses from cereal name, box art, jingle, and mascot.") == true) {

		var p = pantry.ingredients;
		var n = pantry.nextrecipe;
		var rcost = pantry.newrecipecost;
		if (rcost <= sparks.current && rcost != 0){		//a hack to prevent the player from making an empty recipe. probably a better way to do this. (disable the button?)
			makeRecipe(p[n[0]],p[n[1]],p[n[2]],p[n[3]]);
			sparks.current -= rcost;
			cerealname='';
		//	demand.namedbonus=1;
			demand.designboostactive=[0,0,0,0];
			updateGUI();
		}
	}
}

//***************************************************************************************************
//********************************************MARKETING**********************************************
//***************************************************************************************************


function nameCereal(){
	var first = nameadjectives[Math.floor(Math.random() * nameadjectives.length)];
	var middle1 = recipe.current[1].name;
	var middle2 = recipe.current[0].name;
	var last = namenouns[Math.floor(Math.random() * namenouns.length)];
	cerealname = first + " " + middle1 + " " + middle2 + " " + last;
	if (cerealname.length > 30){
		cerealname = first + " " + middle1 + "<br>" + middle2 + " " + last;
	}
	updateGUI();
}

function createMascot(){
	var boygirlname = Math.random()<=0.5 ? mascot.boynames[Math.floor(Math.random() * mascot.boynames.length)] : mascot.girlnames[Math.floor(Math.random() * mascot.girlnames.length)];
	mascot.name = boygirlname + ' the ' + mascot.adjectives[Math.floor(Math.random() * mascot.adjectives.length)] + ' ' + 
	mascot.animals[Math.floor(Math.random() * mascot.animals.length)];

	$('#mascot').html(mascot.name);
}

function calcDemand(){
	
	//**************campaigns!!!*******************
	//checking whether each active campaign is funded - do in calc demand
	adboost=[0,0,0,0];	//boost to each group based on active campaigns (c,t,a,e)
	camps_funded=[0,0,0,0,0,0,0,0,0,0,0,0];
	for (i=0; i<camp.length; i++){
		if (camps_active[i] == 1){
			if (camp[i].fizzcost <= fizz.current && camp[i].cost <= bank){
				fizz.current -= camp[i].fizzcost;
				bank -= camp[i].cost;
				camps_funded[i] = 1;
				adboost[0] += camp[i].boost[0];
				adboost[1] += camp[i].boost[1];
				adboost[2] += camp[i].boost[2];
				adboost[3] += camp[i].boost[3];
				}
			else{
				camps_funded[i] = 0;
				}  //possibly do a jquery call here to show the "not funded!" alert
		}
	}
	adboost[0] = adboost[0]>1 ? adboost[0] : 1;	//minimum of 1 
	adboost[1] = adboost[1]>1 ? adboost[1] : 1;
	adboost[2] = adboost[2]>1 ? adboost[2] : 1;
	adboost[3] = adboost[3]>1 ? adboost[3] : 1;
	//*************************************************
	//console.log('adboost is '+adboost+'. camps_funded is '+camps_funded);
	
	demand.designboost=1;
	var d;
	for (i=0; i<demand.designboostactive.length; i++){
		d = (demand.designboostactive[i] == 1) ? demand.designboostactive[i]*demand.designboostamount[i] : 1;
		demand.designboost *= d;
	}
//	debugger;
	demand.designboost = demand.designboost>1 ? demand.designboost : 1; //minimum of 1; unnecessary?
//	debugger;
//	console.log('designboost is '+demand.designboost+'. actives are '+demand.designboostactive);
	
//	var fratio	= lastsold / (demand.old[0]+demand.old[1]+demand.old[2]+demand.old[3]);//fulfilled orders ratio
	var fratio	= lastsold / openorders;//fulfilled orders ratio
	neworders = 0;
	if (fratio > 1){fratio=1};	//I don't THINK this can happen anyway, but just to be safe...
	var rand = Math.random();
	for (i=0; i<=3; i++){
		//philosophy here is that demand is "customers".  Customers that got product yesterday will buy more product today AND contribute to a growing demand,
		// (presumably they enjoyed the product and told their buddies) whereas unfulfilled customers see no need to order more product until they get some
		// This prevents just letting the game run in idle for a few hours with no production and coming back to massive demand numbers.  It encourages you
		// to come back and improve your production in order to grow your demand, which feels 'realistic' vs. just demand growing explosively when no one is
		// even eating your cereal...
		//demand.current[i] = demand.mboost[i]+demand.old[i]+demand.namedbonus*fratio*(Math.random()*demand.d*Math.exp(recipe.appeal[i]/demand.c));
		demand.current[i] = demand.old[i]+demand.designboost*adboost[i]*fratio*(rand*demand.d*Math.exp(recipe.appeal[i]/demand.c));
/*		if (i==0){
			console.log(adboost + ' adboost resulting in ' + demand.current[i] + ' demand versus' + demand.old[i]+demand.namedbonus*fratio*(rand*demand.d*Math.exp(recipe.appeal[i]/demand.c)));
		}
	*/	
		//oddly enough, since e^0 = 1, a cereal composed of nothing will not only sell, but demand will rise for it over time....lol...maybe fix this at some point
		neworders += demand.current[i] - (1-fratio)*demand.old[i];	//customers ("demand") generate new orders except for those whose orders were not fulfilled yesterday
		demand.old[i] = demand.current[i];
		demand.mboost[i]=0;	//reset market boost

	}
	neworders = Math.floor(neworders);
	openorders += neworders;

}


function processStress(){
//	stress.change = (staff.current*stress.baserate - stress.reduction);
	stress.change = (15 * Math.exp(staff.current/60) - 15) - stress.reduction;
	stress.current += stress.change;
	if (stress.current <0){
		stress.current=0;
	}
	if (stress.current >1000){
		stress.current=1000;
	}
//	sparks.change = sparks.baserate * (1-.02*stress.current);	//each point of stress reduces spark generation by 2%
//	var c = -1*(125/Math.exp(stress.current/150)-125);
	sparks.change = sparks.baserate + .01*(125/Math.exp(stress.current/150)-125);	

	if (sparks.change <0){
		sparks.change=0;
	}
	sparks.current += sparks.change;
}

function sparksToFizz(toconvert){
	var sparkstoconvert = Math.min(sparks.current,toconvert);
	sparks.current-=sparkstoconvert;
	fizz.current+=sparkstoconvert/sparks.sparksperfizz;
	document.getElementById('sparks').innerHTML=prettify(sparks.current.toFixed(2));
 	document.getElementById('fizz').innerHTML=prettify(fizz.current.toFixed(2));
	document.getElementById('s2fmax').innerHTML=abbreviate(sparks.current/sparks.sparksperfizz,true);	//TODO get rid of prettify here?
}

function sparksToTech(toconvert2){
	var sparkstoconvert2 = Math.min(sparks.current,toconvert2);
	sparks.current-=sparkstoconvert2;
	tech.current+=sparkstoconvert2/sparks.sparkspertech;
	document.getElementById('sparks').innerHTML=prettify(sparks.current.toFixed(2));
 	document.getElementById('tech').innerHTML=prettify(tech.current.toFixed(2));
	document.getElementById('s2tmax').innerHTML=abbreviate(sparks.current/sparks.sparkspertech,true);	//TODO get rid of prettify here?
}

function animateprofit(amount){
//	var xpos = 181; //
	$('#profitanimation').remove();
	$('#stockprogressbar_column').append('<div class="aniprofit" id="profitanimation">$'+prettify(amount)+'</div>');
}

function animateup(text){
	var xpos = Math.floor(Math.random() * (281-81+1)+81); //centered about 181px
//	var xpos=81;
	$('#makebox_column').append('<div class="ani" style="right:'+xpos+'px;" id="ani'+anitext.index+'">'+text+'</div>');
	anitext.id.push(anitext.index);
	anitext.life.push(0);
	anitext.index++;
	if (anitext.index > 100){ anitext.index=0;}
}


function deleteAnimatedText(){
	var iterations = anitext.id.length;

	for (q=0; q<iterations; q++){   //age the floating text divs
		anitext.life[q]++;
	}
	var s=0;    //way to backtrack through the array if you delete anything
	for (n=0; n<iterations; n++){
		if (anitext.life[n-s]>1){
			$('#ani'+anitext.id[n-s]).remove();	//delete the div
			anitext.life.shift();				//delete the associated life element
			anitext.id.shift();					//delete the associated id element
			s++;
		}
	}
	
}

//*************************************************************************************************
//********************************PLAYER ACTIONS FUNCTIONS*****************************************
//*************************************************************************************************

function makeBox(){
	var pmakemax = ef;
//	var pbankmax = Math.floor(bank/(ef*boxcost));   //pretty sure this is wrong
	var pbankmax = Math.floor(bank/(boxcost));   //should be right
	var pstockmax = stock.max-stock.current;
	var ptomake = Math.floor(Math.min(pmakemax,pbankmax,pstockmax));
	if (ptomake >= 1){
		stock.current+=ptomake;
		bank = bank - (ptomake*boxcost);
		pdp.boxesmade+=ptomake;
		pdp.materialcosts+=(ptomake*boxcost);
		stockPercent();
		document.getElementById('bank').innerHTML=prettify(bank.toFixed(2));		//just update the related info
		document.getElementById('currentstock').innerHTML=prettify(stock.current);		
		animateup(ptomake);
	}
}

function hire(job){
	if ((bank >= job.wage) && (staff.max > staff.current)){
		job.current++;
		staff.current++;
		job.payroll+=(job.wage*8);
		staff.payroll+=(job.wage*8);
		pdp.payrollcosts+=(job.wage*8);	//for stats - TODO probably change this to just increment everytime someone is paid
		updateGUI();	//could reduce this to the necessary elements that need updating
	}
	
}

function fire(job){
	if (job.current >= 1){
		job.current--;
		staff.current--;
		job.payroll-=(job.wage*8);
		staff.payroll-=(job.wage*8);
		updateGUI();
	}
	
}

function buyUpgrade(u,idx){
	var cost = u.costs[idx];
	var anames = [receivers,inspectors,grinders,mixers,ovens,dryers,toasters,frosters,packers,shippers,factories,warehouses];	//temporary copy of the upgrades for looping purposes
	if (cost <= bank && u.unlocked[idx]==1){	//can afford & unlocked; redundant with disabling/enabling
						//checks for research have already been handled
		bank -= cost;
/*		ef+=u.ef[idx];
		staff.max+=u.staff[idx];
		stock.max+=u.stock[idx];
*/
		$('#c_'+u.objname+(idx-1)).hide();	//hide 'old' CURRENT thing
		$('#c_'+u.objname+(idx)).show();		//show bought thing as new CURRENT thing
		$('#level_'+u.objname).html(idx);		//show level of current thing
		$('#n_'+u.objname+'_row'+(idx)).hide();		//hide 'old' NEXT thing
		if (u.unlocked[idx+1]==1){
			$('#n_'+u.objname+'_requires'+(idx+1)).css('color','white');  //if already unlocked, requirement should be white
		}
		
		$('#n_'+u.objname+'_row'+(idx+1)).show();	//show new NEXT thing you can buy 
		
		if (u.upgradetype == 'factory'){
			$('#next_'+u.objname+'_cost').html(prettify(u.staff[idx+1]));	//show new NEXT thing you can buy 
		}
		else if (u.upgradetype == 'warehouse'){
			$('#next_'+u.objname+'_cost').html(abbreviate(u.stock[idx+1],false));	//show new NEXT thing you can buy 
		}
		else {
			$('#next_'+u.objname+'_cost').html(prettify(u.ef[idx+1]));	//show new NEXT thing you can buy 
		}
		u.index++;	//keep track of which upgrade you are on
		//ef=1;
		ef=1;
		staff.max=0;
		stock.max=0;
		for (i=0; i<anames.length; i++){
			ef+=anames[i].ef[(anames[i].index)-1];
			staff.max+=anames[i].staff[(anames[i].index)-1];
			stock.max+=anames[i].stock[(anames[i].index)-1];
		}

		updateGUI();
	}
}


function unlockUpgrade(n,idx,r){
	if (n.requires[idx]==r){	//if the purchased research matches a requirement for this category
		n.unlocked[idx]=1;		//unlock that thing
		$('#n_'+n.objname+'_requires'+(idx)).css('color','white');	//change the "Requires" text color
	}
}

function buyResearch(r){
	var tcost = research[r].techcost;
	if (tcost <= tech.current){
		research[r].visible = 0;
		research[r].researched = 1;			//set researched variable to true
		$('#completedresearch'+r).show();
		
		for (i=0; i<receivers.requires.length; i++){
			unlockUpgrade(receivers,i,r);
			unlockUpgrade(inspectors,i,r);
			unlockUpgrade(grinders,i,r);
			unlockUpgrade(mixers,i,r);
			unlockUpgrade(ovens,i,r);
			unlockUpgrade(dryers,i,r);
			unlockUpgrade(toasters,i,r);
			unlockUpgrade(frosters,i,r);
			unlockUpgrade(packers,i,r);
			unlockUpgrade(shippers,i,r);	
			unlockUpgrade(factories,i,r);
			unlockUpgrade(warehouses,i,r);
		}
		
		switch (r){
			case 1: 
			    $('#dryers').show(); 
			    unlocks.dryers=1; 
			    break;     
			case 4: 
			    $('#inspectors').show(); 
			    unlocks.inspectors=1;
			    break;
			case 6: 
			    $('#toasters').show();
			    unlocks.toasters=1;
			    break;
			case 8: 
			    $('#grinders').show();
			    unlocks.grinders=1;
			    break;
			case 11: 
			    $('#frosters').show();
			    unlocks.frosters=1;
			    break;
			default: break;
		}
		
		for (z=0; z<research.length; z++){	//check if any other research can be made visible (prereqs met)
			var unlock = true;
			if (research[z].reqnumbers[0]!=null){	//check that this isn't a starting research with no prereqs
				for (req=0; req<research[z].reqnumbers.length; req++){		//for each prereq #
					var prereq = research[z].reqnumbers[req];				//get each prereq's #
					var prereq_researched = research[prereq].researched;	//get the researched flag for each prereq
					if (prereq_researched == 0){	//if this prereq is NOT researched, you do not unlock research[z]. might need an OR to handle already researched stuff
						unlock = false;				//if any one of your prereqs is not met, you fail the test
					}

					
				}
			}
			if (unlock && research[z].researched == 0){
				research[z].visible=1;
			}
			if (research[z].visible == 1){
				$('#researchbuttondiv'+z).show();	//show research that pre-reqs have been met for
			}
			else {
				$('#researchbuttondiv'+z).hide();	//I guess this hides the research button that you just bought, yeah?
			}
		}
		tech.current -= tcost;
	disableResearchButtons();	//for a quick update of the buttons without a bloated updateGUI call
	}
}

function buyMarket(m){
	var bcost = markets.costs[m];
	var fcost = markets.fizzcosts[m];
	if (bcost <= bank && fcost <= fizz.current){
		bank -= bcost;
		fizz.current -= fcost;
		//var boost=[0,0,0,0];
		switch (m){
			case 0:	//name cereal
			nameCereal();
			//boost=[2,2,2,2];	//child,teen,adult,elderly
			//demand.namedbonus=1.1;
			demand.designboostactive[0]=1;
			break;
			
			case 1: //box art
			//box art function goes here
			//boost=[16,16,16,16];
			demand.designboostactive[1]=1;
			break;
			
			case 2: //jingle
			//jingle function goes here
			//boost=[80,80,80,80];
			demand.designboostactive[2]=1;
			break;
			
			case 3: //mascot
			createMascot();
			//mascot function goes here
			//boost=[800,800,0,0];
			demand.designboostactive[3]=1;
			break;
	
		/*
			case 4: //newspaper
			boost=[0,0,2400,2400];
			break;
			
			case 5: //radio
			boost=[0,0,6400,6400];
			break;
			
			case 6: //internet
			boost=[16000,16000,0,0];
			break;
			
			case 7:	//tv commercial (targeted)
			var min = demand.current[0];
			var minindex = 0;
			for (n=1; n<demand.current.length; n++){
				if (demand.current[n]<min){
					min=demand.current[n];
					minindex=n;
				}
			}
		
		
			boost=[0,0,0,0];
			boost[minindex]=(0.1*demand.current[minindex]);	//10% boost to lowest demand
			break;
			
			case 8:
			for (i=0; i<demand.current.length; i++){		
				boost[i]=(0.1*demand.current[i])	//10% boost to all groups
			}
			break;
		*/
		
		}
		
		/*
		for (a=0; a<boost.length; a++){
			demand.mboost[a]+=boost[a];		//add calculated boost to the total boost for tomorrow (allows multiple marketing things to be bought in 1 day without overwriting each other's boost)
		}
		*/
	disableMarketButtons();	//quickly disable buttons now that you've spent a bunch of fizz
	}
}

function buyToy(i){
	var cost = toys.costs[i];
	if (cost <= salary.wallet){
		salary.wallet -= cost;
		stress.reduction+=toys.reductions[i];
		$('#toybuttonrow'+i).hide();
		$('#boughttoy'+i).show();
		toys.bought[i]=1;
		updateGUI();
	}
}


function beg(){
	var passfail = Math.floor((Math.random() * 100) + 1);
	if (passfail > 75){
		var begyield = 0.5* Math.floor((Math.random() * 6) + 1);
		bank += begyield;
		pdp.grossreceipts+=begyield;	//for stats
	}
	updateGUI();
}

function cheat(){
	bank +=100000000;
	fizz.current +=10000000;
	tech.current +=10000000;
	sparks.current +=10000000;
	updateGUI();
}

//*************************************************************************************************
//************************************GAME ENGINE FUNCTIONS****************************************
//*************************************************************************************************
function paySalary(){ //called by advance day
	/*
	salary.counter=0;
	var owed = salary.currentsalary + salary.unpaid;
	if (owed <= bank){
		salary.wallet+=owed;
		bank-=owed;
		salary.unpaid=0;
	}
	else{
		var payable = bank;
		salary.wallet+=payable;
		bank=0;
		salary.unpaid = owed - payable;
	}
	*/
	
	salary.counter=0;
	salary.wallet+=salary.unpaid;
	salary.unpaid=0;

}

function progress(){ //call once per day? for dev call every updateGUI; TODO add an alert that something has been unlocked
	if (unlocks.assemblypanel == 0 && totalboxesshipped > 24){ //works
		unlocks.assemblypanel = 1;
		$('#panel_assembly').show();//*
	}
	if (unlocks.staffpanel == 0 && ef > 5){  //works
		unlocks.staffpanel = 1;
		$('#nav_business').show();//*
		$('#nav_production').show();//*
		$('#panel_staff').show();//*
		$('#hireworkers').show();//*
		$('#resources').show();//*
		$('#resources_stress').show();//*
	}
	if (unlocks.buildingspanel_w == 0 && openorders > 100){ //works
		unlocks.buildingspanel_w = 1;
		$('#panel_buildings').show();//*
		$('#warehousesrow').show();//*
	}
	if (unlocks.buildingspanel_f == 0 && (workers.current+marketers.current+engineers.current) > 4){ //works
		unlocks.buildingspanel_f = 1;
		$('#panel_buildings').show();//*
		$('#factoriesrow').show();
	}
	if (unlocks.stressreductionspanel == 0 && workers.current > 2){ //works
		unlocks.stressreductionspanel = 1;
		$('#nav_creative').show();//*
		$('#panel_stressreductions').show();//*
		$('#resources_sparks').show();//*
	}
	if (unlocks.marketingpanel == 0 && openorders > 250){  //works
		unlocks.marketingpanel = 1;
		$('#panel_marketing').show();//*
		$('#resources_fizz').show();//*
		$('#resources_sparks').show();//*
	}
	if (unlocks.marketers == 0 && pdp.profityesterday > 200){	//TODO.  Also, stretch out upgrades more?
		unlocks.marketers = 1;
		$('#hiremarketers').show();//*
	}
	if (unlocks.researchpanel == 0 && ef > 10){	//works
		unlocks.researchpanel = 1;
		$('#nav_creative').show();//*
		$('#panel_research').show();//*
		$('#resources_tech').show();//*
		$('#resources_sparks').show();//*
	}
	if (unlocks.engineers == 0 && pdp.profityesterday > 400){	//TODO
		unlocks.engineers = 1;
		$('#hireengineers').show();//*
	}
	if (unlocks.recipepanel == 0 && openorders > 1000){
		unlocks.recipepanel = 1;
		$('#panel_recipe').show();//*
	}
	if (marketers.current > 0){
		$('#panel_reports').show();//*
	}
	else if (marketers.current < 1){	//move to hire/fire function instead?
		$('#panel_reports').hide();//*
	}
}

function disableResearchButtons(){
	for (t=0; t<research.length; t++){
		if (research[t].visible == 1 && research[t].researched == 0){	//may be redundant to check if researched, oh well
			if (tech.current < research[t].techcost){
				$('#researchbutton'+t).prop('disabled',true);	//disables the chosen research button
			}
			else{
				$('#researchbutton'+t).prop('disabled',false);	//enables the chosen research button
			}
		}
	}
}

function disableMarketButtons(){
	for (m=0; m<markets.names.length; m++){
		if (markets.fizzcosts[m] > fizz.current || markets.costs > bank){
			$('#marketbutton'+m).prop('disabled',true);
		}
		else{
			$('#marketbutton'+m).prop('disabled',false);
		}
	}
}

function disableToyButtons(){
	for (t=0; t<toys.names.length; t++){
		if (toys.costs[t] > bank){
			$('#toybutton'+t).prop('disabled',true);
		}
		else{
			$('#toybutton'+t).prop('disabled',false);
		}
	}
}

function disableRecipeButton(){
	if (pantry.row_cost[pantry.row_index] >= sparks.current){
		$('#recipe_complexity_button').prop('disabled',true);
	}
	else{
		$('#recipe_complexity_button').prop('disabled',false);
	}
	
	if (pantry.newrecipecost >= sparks.current){
		$('#make_recipe_button').prop('disabled',true);
	}
	else{
		$('#make_recipe_button').prop('disabled',false);
	}
	
	if (pantry.cost >= sparks.current){
		$('#unlock_ingredient_button').prop('disabled',true);
	}
	else{
		$('#unlock_ingredient_button').prop('disabled',false);
	}
	
}

function disableUpgradeButtons(){
	var to_disable =[];
	to_disable[0]=receivers.costs[receivers.index] > bank ? true : false;
	to_disable[1]=inspectors.costs[inspectors.index] > bank ? true : false;
	to_disable[2]=grinders.costs[grinders.index] > bank ? true : false;
	to_disable[3]=mixers.costs[mixers.index] > bank ? true : false;
	to_disable[4]=ovens.costs[ovens.index] > bank ? true : false;
	to_disable[5]=dryers.costs[dryers.index] > bank ? true : false;
	to_disable[6]=toasters.costs[toasters.index] > bank ? true : false;
	to_disable[7]=frosters.costs[frosters.index] > bank ? true : false;
	to_disable[8]=packers.costs[packers.index] > bank ? true : false;
	to_disable[9]=shippers.costs[shippers.index] > bank ? true : false;
	to_disable[10]=warehouses.costs[warehouses.index] > bank ? true : false;
	to_disable[11]=factories.costs[factories.index] > bank ? true : false;
	
	$('#n_receivers'+receivers.index).prop('disabled',to_disable[0]);
	$('#n_inspectors'+inspectors.index).prop('disabled',to_disable[1]);
	$('#n_grinders'+grinders.index).prop('disabled',to_disable[2]);
	$('#n_mixers'+mixers.index).prop('disabled',to_disable[3]);
	$('#n_ovens'+ovens.index).prop('disabled',to_disable[4]);
	$('#n_dryers'+dryers.index).prop('disabled',to_disable[5]);
	$('#n_toasters'+toasters.index).prop('disabled',to_disable[6]);
	$('#n_frosters'+frosters.index).prop('disabled',to_disable[7]);
	$('#n_packers'+packers.index).prop('disabled',to_disable[8]);
	$('#n_shippers'+shippers.index).prop('disabled',to_disable[9]);
	$('#n_warehouses'+warehouses.index).prop('disabled',to_disable[10]);
	$('#n_factories'+factories.index).prop('disabled',to_disable[11]);

}

function prettify(input){  		//this function rounds down the decimal and adds commas; shamelessly borrowed from civclicker
	var output = '';
		output = input.toString();
		var characteristic = '', //the bit that comes before the decimal point
			mantissa = '', //the bit that comes afterwards
			digitCount = 0,
			delimiter = ",";

		//first split the string on the decimal point, and assign to the characteristic and mantissa
		var parts = output.split('.');
		if (typeof parts[1] === 'string'){ var mantissa = '.' + parts[1];} //check it's defined first, and tack a decimal point to the start of it

		//then insert the commas in the characteristic
		var charArray = parts[0].split(""); //breaks it into an array
		for (var i=charArray.length; i>0; i--){ //counting backwards through the array
			characteristic = charArray[i-1] + characteristic; //add the array item at the front of the string
			digitCount++;
			if (digitCount == 3 && i!=1){ //once every three digits (but not at the head of the number)
				characteristic = delimiter + characteristic; //add the delimiter at the front of the string
				digitCount = 0;
			}
		}
		output = characteristic + mantissa; //reassemble the number
	return output;
}

/* old hide / unhide functions. shouldn't need since using jquery
function unhide(hiddenthing){
	document.getElementById(hiddenthing).style.visibility = 'visible';
}

function hide(thing){
//	document.getElementById(thing).style.visibility = 'hidden';	
	document.getElementById(thing).style.display = 'none';	
}
*/

function passTime(){
	time.clockindex++;
	processStress();
	if (time.clockindex >= time.clock.length){
		advanceDay();
	}
}

function advanceDay(){  
	sellBoxes();
	reportPDP();
	time.day++;
	if (time.day>=366){
		time.day=1;
		time.year++;
	}
	time.clockindex = 0;
	salary.counter++;
	if (salary.counter > 14){
		paySalary();
	}
	calcDemand();
}

function sellBoxes(){
	var sold = 0;
	if (openorders <= stock.current) {	//more stock than orders, sell up to orders
		sold = openorders;
	}
	else{	//more orders than we can fill, sell up to stock
		sold = stock.current;
	}
	var gross=sold*boxsale;
	bank += gross;	//profit!
	salary.unpaid+=(sold/100);
	stock.current-=sold;	//ship the stock
	openorders-=sold;		//reduce the open orders by what was shipped
	lastsold = sold;
	pdp.boxesshipped = sold;
	pdp.grossreceipts += gross;
	totalboxesshipped += sold;
	animateprofit(gross);
}

function reportPDP(){
	pdp.payrollcosts=staff.payroll+pdp.payrollforhiredtoday;
	pdp.totalcosts = pdp.materialcosts+pdp.payrollcosts;
	pdp.netprofit = pdp.grossreceipts - pdp.totalcosts;
	pdp.profityesterday = pdp.grossreceipts - pdp.materialcosts - pdp.todayspayroll;

	document.getElementById('pdp_boxesmade').innerHTML=prettify(pdp.boxesmade.toFixed(0));
	document.getElementById('pdp_boxesshipped').innerHTML=prettify(pdp.boxesshipped.toFixed(0));
	document.getElementById('pdp_boxesshipped2').innerHTML=prettify(pdp.boxesshipped.toFixed(0));
//	document.getElementById('pdp_boxesscrapped').innerHTML=prettify(pdp.boxesscrapped.toFixed(0));
	document.getElementById('pdp_changeinstock').innerHTML=prettify((stock.current-pdp.oldstock).toFixed(0));
	document.getElementById('pdp_materialcosts').innerHTML=prettify(pdp.materialcosts.toFixed(2));
	document.getElementById('pdp_payrollcosts').innerHTML=prettify(pdp.payrollcosts.toFixed(2));
	document.getElementById('pdp_totalcosts').innerHTML=prettify(pdp.totalcosts.toFixed(2));
	document.getElementById('pdp_grossreceipts').innerHTML=prettify(pdp.grossreceipts.toFixed(2));
	document.getElementById('pdp_netprofit').innerHTML=prettify(pdp.netprofit.toFixed(2));
//	document.getElementById('pdp_profityesterday').innerHTML=prettify(pdp.profityesterday.toFixed(2));
	
//	console.log('gross receipts = '+pdp.grossreceipts+'. material costs = '+pdp.materialcosts+'. payroll = '+pdp.todayspayroll+'. profit = '+pdp.profityesterday);
	document.getElementById('pdp_profityesterday').innerHTML = (pdp.profityesterday >= 0) ? '$'+(prettify(pdp.profityesterday.toFixed(2))):'($'+prettify(pdp.profityesterday.toFixed(2))+')';
	document.getElementById('pdp_profityesterday').style.color = (pdp.profityesterday < 0) ? '#f00' : '#000';
	progress();
	
	pdp.payrollforhiredtoday=0;
	
	pdp.boxesmade=0;
	pdp.boxesshipped=0;
	pdp.boxesscrapped=0;
	pdp.oldstock=stock.current;
	pdp.materialcosts=0;
	pdp.payrollcosts=0;
	pdp.totalcosts=0;
	pdp.grossreceipts=0;
	pdp.netprofit=0;
	pdp.profityesterday=0;
	pdp.todayspayroll=0;
}

function workersProduce(){
	//new goodness.  This should be much better than the For loop of doom.
    if (workers.current>0){ //wrap whole function in this if statement so we don't call it when we have no workers
        var workermax = ef * workers.current;				 	//max boxes the workers could make. 
	    var workerboxcombosmax = Math.floor(bank/(workers.wage+ef*boxcost)); //max # of workers & their box production that you can afford
	    var bankmax = workerboxcombosmax * ef;                  //max boxes you can afford to make
	    var stockmax = stock.max-stock.current;                 //max boxes you could put into stock
	    var tomake = Math.floor(Math.min(workermax,bankmax,stockmax));  //boxes made will be the minimum of the 3 possible maxes
	    var workerstopay = Math.floor(tomake/ef);               //only pay workers that can reach their full production potential (allowed via $,stock)
	    tomake = workerstopay * ef;                             //only make boxes for fully utilized workers (possibly could be an issue if EF gets really high relative to stock)
        stock.current+=tomake;                                  //make boxes!
        bank= bank - (tomake*boxcost) - (workerstopay*workers.wage);    //pay workers and charge materials
        pdp.boxesmade+=tomake;
        pdp.materialcosts+=(tomake*boxcost);
		pdp.todayspayroll+=(workerstopay*workers.wage);
		if (bank>=(workers.wage+boxcost) && (stock.max-stock.current) && workers.current>workerstopay){	//at least one unused worker that we can afford to pay to make at least one box 
			//this is to handle when your available stock space is less than what 1 worker can produce (e.g. room for 4 boxes, workers ef is 6)
			bank-=workers.wage;		//pay your 'partial' worker
			pdp.todayspayroll+=workers.wage;
			
			tomake = Math.floor(Math.min(bank/boxcost,stock.max-stock.current,ef));
			stock.current+=tomake;                                  //make boxes!
			bank-=tomake*boxcost;
			pdp.boxesmade+=tomake;
			pdp.materialcosts+=(tomake*boxcost);
		}
       // stockPercent();	//redundant with updateGUI?
	//get rid of paying workers through a separate function, handled here now
    }
}

function stockPercent(){	//calculate the % of the stock progress bar to fill
	stock.percent1 = stock.current/stock.max*100 + "%";
	stock.percent2 = (openorders/stock.max < 1) ? openorders/stock.max*100 + "%" : "100%";
	document.getElementById('stockprogressbar1').style.width=stock.percent1;
	document.getElementById('stockprogressbar2').style.width=stock.percent2;
}

function othersProduce(){
	fizz.change=marketers.current * marketers.yield;
	fizz.current+=fizz.change;
	tech.change=engineers.current * engineers.yield;
	tech.current+=tech.change;
}

function pay(job){
	var quit = 0;
	for (i=1; i<= job.current; i++){
		if (bank >= job.wage){	//yay money, I guess I will stay.
			bank-= job.wage;
			pdp.todayspayroll+=job.wage;
		}
		else{				//I quit!! TODO: notify that people quit :(
			job.current--;
			staff.current--;
			job.payroll-=(job.wage*8);
			staff.payroll-=(job.wage*8);
			quit++;
		}
	}
}

function staffGetsPaid(){
	//pay(workers);		//paid as they produce
	pay(marketers);
	pay(engineers);
}

function abbreviate(n,forcedec){	//
	var o=n;
	if (n <1000 && forcedec){
		o = n.toFixed(1);
	}
	else if (n>= 1000 && n < 1000000){
		o = (Math.floor(n/1000*10)/10).toFixed(1) + "K";
	}
	else if (n>= 1000000){
		o = (Math.floor(n/1000000*10)/10).toFixed(1) + "M";
	}
	else if (n>= 1000000000){
		o = (Math.floor(n/1000000000*10)/10).toFixed(1) + "B";
	}
	else if (n>= 1000000000000){
		o = (Math.floor(n/1000000000000*10)/10).toFixed(1) + "T";
	}
	
	return o;
}

function showAfterLoad(){ //run this function after you've loaded everything and hidden everything

	var anames = [receivers,inspectors,grinders,mixers,ovens,dryers,toasters,frosters,packers,shippers,factories,warehouses];	//temporary copy of the upgrades for looping purposes
    for (n=0; n<anames.length; n++){         //for each upgrade type
        var i=anames[n].index;               //hide everything first in jquery on document load; then this function will just show where you are with the index!
        $('#c_'+anames[n].objname+(i-1)).show();
	    $('#n_'+anames[n].objname+'_row'+i).show();
		$('#level_'+anames[n].objname).html(i-1);		//show level of current thing
	    if (anames[n].upgradetype == 'manufacturing'){       //show the benefit
	        $('#next_'+anames[n].objname+'_cost').html(prettify(anames[n].ef[i]));
	    }
	    else if (anames[n].upgradetype == 'factory'){
	        $('#next_'+anames[n].objname+'_cost').html(prettify(anames[n].staff[i]));
	    }
	    else if (anames[n].upgradetype == 'warehouse'){
	        $('#next_'+anames[n].objname+'_cost').html(prettify(anames[n].stock[i]));
	    }
		for (i=1; i<receivers.n.length; i++){
			if (anames[n].unlocked[i]==1){
				$('#n_'+anames[n].objname+'_requires'+(i)).css('color','white');  //if already unlocked, requirement should be white
			}
		}
    }

	
	if (unlocks.inspectors==1){$('#inspectors').show()};        //else hide and get rid of jquery code?
    if (unlocks.grinders==1){$('#grinders').show()};
    if (unlocks.dryers==1){$('#dryers').show()};
    if (unlocks.toasters==1){$('#toasters').show()};
    if (unlocks.frosters==1){$('#frosters').show()};

	if (unlocks.assemblypanel == 1){
		$('#panel_assembly').show();
	}
	if (unlocks.staffpanel == 1){
		$('#nav_business').show();//*
		$('#nav_production').show();//*
		$('#panel_staff').show();//*
		$('#hireworkers').show();//*
		$('#resources').show();//*
		$('#resources_stress').show();//*
	}
	if (unlocks.buildingspanel_w == 1){
		$('#panel_buildings').show();//*
		$('#warehousesrow').show();//*
	}
	if (unlocks.buildingspanel_f == 1){ //works
		$('#panel_buildings').show();//*
		$('#factoriesrow').show();
	}
	if (unlocks.stressreductionspanel == 1){ //works
		$('#nav_creative').show();//*
		$('#panel_stressreductions').show();//*
		$('#resources_sparks').show();//*
	}
	if (unlocks.marketingpanel == 1){  //works
		$('#panel_marketing').show();//*
		$('#resources_fizz').show();//*
		$('#resources_sparks').show();
	}
	if (unlocks.marketers == 1){	
		$('#hiremarketers').show();//*
	}
	if (unlocks.researchpanel == 1){	//works
		$('#nav_creative').show();//*
		$('#panel_research').show();//*
		$('#resources_tech').show();//*
		$('#resources_sparks').show();
	}
	if (unlocks.engineers == 1){	//TODO
		$('#hireengineers').show();//*
	}
	if (unlocks.recipepanel == 1){
		$('#panel_recipe').show();//*
	}
	if (marketers.current > 0){
		$('#panel_reports').show();//*
	}
	else if (marketers.current < 1){	//move to hire/fire function instead?
		$('#panel_reports').hide();//*
	}
	
	for (t=0; t<toys.names.length; t++){
		if (toys.bought[t] == 1){$('#boughttoy'+t).show();}
	}
	
	if (research[0].researched == 1){
		research[0].visible = 0;
		$('#researchbuttondiv0').hide();
	}
	
	for (r=0; r<research.length; r++){
		if (research[r].visible == 1){
			$('#researchbuttondiv'+r).show();
		}
		if (research[r].researched == 1){
			$('#completedresearch'+r).show();
		}
	}
	
	pantry.ingredients[1].show=1;
	var nextrecipehtml = '';
	for (p=0; p<pantry.ingredients.length; p++){
		if (pantry.ingredients[p].show == 1){
			$('#ownedingredients').append('<div class="row">'+pantry.ingredients[p].name+'</div>');
				nextrecipehtml+='<option value="'+p+'">'+pantry.ingredients[p].name+'</option>';
		}
	}
	$('.nextingrdrops').html(nextrecipehtml);
	
	
	for (i=1; i<pantry.row_unlocked.length; i++){
		if (pantry.row_unlocked[i] == 1){
			$('#ingredient'+(i+1)+'row').show();
			
		}
	}
	$('#nextingrrowcost').html(prettify(pantry.row_cost[pantry.row_index]));
	if (pantry.row_index>3){
		$('#recipe_complexity_button').hide();
	}
	$('#nextingr1').val(pantry.nextrecipe[0]);	//have to reinsert the selected ingredient into the dropdowns or they go blank
	$('#nextingr2').val(pantry.nextrecipe[1]);
	$('#nextingr3').val(pantry.nextrecipe[2]);
	$('#nextingr4').val(pantry.nextrecipe[3]);
	
	$('#mascot').html(mascot.name);
	
	for (t=0; t<camp.length; t++){
		if (camps_active[t]==1){$('#camp'+t).bootstrapToggle('on');}
	}
}

function updateGUI(){
	stockPercent();
	progress();	//show unlocked panels/etc
	document.getElementById('year').innerHTML=time.year;
	document.getElementById('day').innerHTML=time.day;
	document.getElementById('time').innerHTML=time.clock[time.clockindex];
	document.getElementById('bank').innerHTML=prettify(bank.toFixed(2));	
	document.getElementById('staffpayroll').innerHTML=abbreviate(staff.payroll,false);
//	document.getElementById('boxsale').innerHTML=prettify(boxsale.toFixed(2));
//	document.getElementById('boxcost').innerHTML=prettify(boxcost.toFixed(2));
	document.getElementById('neworders').innerHTML=prettify(neworders);	
	document.getElementById('openorders').innerHTML=prettify(openorders);
	document.getElementById('currentstock').innerHTML=prettify(stock.current);
 	document.getElementById('maxstock').innerHTML=prettify(stock.max);
	document.getElementById('maxstock2').innerHTML=prettify(stock.max);
	document.getElementById('staff').innerHTML=prettify(staff.current);
 	document.getElementById('maxstaff').innerHTML=prettify(staff.max);
// 	document.getElementById('ef').innerHTML=prettify(ef);
	document.getElementById('ef2').innerHTML=prettify(ef);
	document.getElementById('ef3').innerHTML=prettify(ef);
	document.getElementById('efboxescost').innerHTML=prettify((ef*boxcost).toFixed(2));
	document.getElementById('cerealname').innerHTML=cerealname;
	document.getElementById('totalboxesshipped').innerHTML = prettify(totalboxesshipped);

	document.getElementById('bpworkers').innerHTML=prettify(workers.current);
	document.getElementById('bpboxesday').innerHTML=prettify(workers.current*ef*8);
	document.getElementById('bpwarehouse').innerHTML=warehouses.n[warehouses.index-1];
	document.getElementById('bpfactory').innerHTML=factories.n[factories.index-1];
	
	document.getElementById('workers').innerHTML=prettify(workers.current);
	document.getElementById('workerswage').innerHTML=prettify(workers.wage.toFixed(0));
	document.getElementById('workerspayroll').innerHTML=abbreviate(workers.payroll,false);	
 	document.getElementById('workerproduction').innerHTML=prettify(ef.toFixed(0));
 	document.getElementById('totalworkerproduction').innerHTML=prettify((ef * workers.current).toFixed(0));

 	document.getElementById('marketers').innerHTML=prettify(marketers.current);
	document.getElementById('marketerswage').innerHTML=prettify(marketers.wage.toFixed(0));
	document.getElementById('marketerspayroll').innerHTML=abbreviate(marketers.payroll,false);	
 	document.getElementById('marketerproduction').innerHTML=prettify(marketers.yield.toFixed(0));
 	document.getElementById('totalmarketerproduction').innerHTML=prettify((marketers.current * marketers.yield).toFixed(0));

 	document.getElementById('engineers').innerHTML=prettify(engineers.current);
	document.getElementById('engineerswage').innerHTML=prettify(engineers.wage.toFixed(0));
	document.getElementById('engineerspayroll').innerHTML=abbreviate(engineers.payroll,false);	
 	document.getElementById('engineerproduction').innerHTML=prettify(engineers.yield.toFixed(0));
 	document.getElementById('totalengineerproduction').innerHTML=prettify((engineers.current * engineers.yield).toFixed(0));

 	document.getElementById('fizz').innerHTML=prettify(fizz.current.toFixed(2));
	document.getElementById('fizz2').innerHTML=prettify(fizz.current.toFixed(2));
	document.getElementById('fizzchange').innerHTML=prettify(fizz.change.toFixed(2));
	document.getElementById('fizzchange2').innerHTML=prettify(fizz.change.toFixed(2));
 	document.getElementById('tech').innerHTML=prettify(tech.current.toFixed(2));	
 	document.getElementById('tech2').innerHTML=prettify(tech.current.toFixed(2));	
	document.getElementById('techchange').innerHTML=prettify(tech.change.toFixed(2));
	document.getElementById('techchange2').innerHTML=prettify(tech.change.toFixed(2));
	document.getElementById('stress2').innerHTML = (stress.change >= 0) ? (stress.current.toFixed(2))+'<span class="glyphicon glyphicon-alert"></span>&nbsp;(+'+prettify(stress.change.toFixed(2))+'/hr)' :
		(stress.current.toFixed(2))+'<span class="glyphicon glyphicon-alert"></span>&nbsp;(-'+prettify((-1*stress.change).toFixed(2))+'/hr)';
	document.getElementById('stress2').style.color = (stress.change > 0) ? '#f00' : '#000';
	document.getElementById('sparks').innerHTML=prettify(sparks.current.toFixed(2));
	document.getElementById('sparks2').innerHTML=prettify(sparks.current.toFixed(2));
	document.getElementById('sparkschange').innerHTML=prettify(sparks.change.toFixed(2));
	document.getElementById('sparkschange2').innerHTML=prettify(sparks.change.toFixed(2));
	document.getElementById('sparkschangecol').style.color = (sparks.change > 0) ? '#000' : '#f00';
	document.getElementById('sparkschangerow').style.color = (sparks.change > 0) ? '#000' : '#f00';
	document.getElementById('s2tmax').innerHTML=abbreviate(sparks.current/sparks.sparkspertech,true);
	document.getElementById('s2fmax').innerHTML=abbreviate(sparks.current/sparks.sparksperfizz,true);
	
	document.getElementById('dchild').innerHTML=prettify(demand.current[0].toFixed(2));	
	document.getElementById('dteens').innerHTML=prettify(demand.current[1].toFixed(2));
	document.getElementById('dadults').innerHTML=prettify(demand.current[2].toFixed(2));
	document.getElementById('delderly').innerHTML=prettify(demand.current[3].toFixed(2));
	document.getElementById('dsum').innerHTML=prettify((demand.current[0]+demand.current[1]+demand.current[2]+demand.current[3]).toFixed(2));

//	document.getElementById('stockprogressbar1').style.width=stock.percent1;	//handled via stockPercent call at the top of this function
//	document.getElementById('stockprogressbar2').style.width=stock.percent2;

	document.getElementById('ingr1').innerHTML=recipe.current[0].name;
	document.getElementById('ingr2').innerHTML=recipe.current[1].name;
	document.getElementById('ingr3').innerHTML=recipe.current[2].name;
	document.getElementById('ingr4').innerHTML=recipe.current[3].name;
	
	disableResearchButtons();	//disable buttons of stuff you can't afford
	disableMarketButtons();	
	disableToyButtons();
	disableUpgradeButtons();
	disableRecipeButton();
	
	deleteAnimatedText();
	
	document.getElementById('newrecipecost').innerHTML=prettify(pantry.newrecipecost.toFixed(0));
	
	document.getElementById('nextingrcost').innerHTML=prettify(pantry.cost.toFixed(0));
	
//	if (!toys.allrevealed){
		for (i=0; i<toys.buttons.length; i++){
			if (toys.costs[i] <= salary.wallet*2 && toys.bought[i]==0){		//only show stress reducers that you have reached 1/2 the money for
				$('#toybuttonrow'+i).show();
				if (i==(toys.buttons.length-1)){toys.allrevealed=true;}
			}
		}
//	}

	document.getElementById('wallet').innerHTML=prettify(salary.wallet.toFixed(2));
	document.getElementById('daystopayday').innerHTML=prettify((15-salary.counter).toFixed(0));
	document.getElementById('unpaid').innerHTML=prettify(salary.unpaid.toFixed(2));
}

$(document).ready(function jqstuff(){
//    $('[data-toggle="tooltip"]').tooltip(); 	//this crashes randomly in chrome.....WHY

/* Generic jQuery template:
$(document).ready(function() {
    $('thingToTouch').event(function() {
        $('thingToAffect').effect();
    });
});
*/
	var toys_buttons='';
	var owned_toys='';
	for (i=0; i<toys.buttons.length; i++){          //insert stress reducer buttons html
		toys_buttons+=toys.buttons[i];
		owned_toys+='<div class="row" id="boughttoy'+i+'">'+toys.names[i]+'</div>';
		//$('#buystuff').append(toys.buttons[i]);
		//$('#ownedstressreducers').append('<div class="row" id="boughttoy'+i+'">'+toys.names[i]+'</div>');
	};
	
	$('#buystuff').append(toys_buttons);
	$('#ownedstressreducers').append(owned_toys);
	
	for (i=0; i<toys.buttons.length; i++){          //hide stress reducer buttons
		$('#toybuttonrow'+i).hide();
		$('#boughttoy'+i).hide();
	};
	
	var markets_buttons='';
	
	for (i=0; i<markets.buttons.length; i++){       //insert marketing buttons html
		markets_buttons+=markets.buttons[i];
	};
	
	$('#buymarketstuff').append(markets_buttons);
	
	//*****************************
	//toggle buttons for ad campaigns
	var campshtml='';
	for (c=0; c<camp.length; c++){
	//	campshtml+='<input id="camp'+c+'" type="checkbox" class="btn btn-primary campsclass" data-onstyle="success" data-offstyle="danger" data-height="30" data-width="60" data-toggle="toggle"></input><br>';
		campshtml+='<div class="row box2"><div class="col-sm-4"><h5>'+camp[c].name+'</h5>'+camp[c].benefit+
		'</div><div class="col-sm-4">-'+camp[c].fizzcost+'<span class="glyphicon glyphicon-certificate"></span>/day<br>-$'+prettify(camp[c].cost)+
		'/day</div><div class="col-sm-4"><input id="camp'+c+
		'" type="checkbox" class="btn btn-primary campsclass" '
		+'data-onstyle="success" data-offstyle="danger" data-height="30" data-width="60" data-toggle="toggle"></input></div> </div>';
		}
	$('#campaigns').append(campshtml);
	
	$(function() {									//***initialize all toggles***
		$('.campsclass').bootstrapToggle();
	})
	//****************************
	//****************************
	
	var research_buttons='',completed_research='';
	
	for (i=0; i<research.length; i++){
		research_buttons+=research[i].rbutton;
		completed_research+='<div class="row" id="completedresearch'+i+'">'+research[i].name+'</div>';
	};
	
	$('#buyresearchstuff').append(research_buttons);
	$('#completedresearch').append(completed_research);
		
		
	for (i=0; i<research.length; i++){
		$('#researchbuttondiv'+i).hide();
		$('#completedresearch'+i).hide();
	}
	$('#researchbuttondiv0').show();                //show first research thing
	research[0].visible=1;


	var receivers_current='', receivers_next='', inspectors_current='', inspectors_next='', grinders_current='', grinders_next='', mixers_current='', mixers_next='', ovens_current='', ovens_next='',
	dryers_current='', dryers_next='', toasters_current='', toasters_next='', frosters_current='', frosters_next='', packers_current='', packers_next='', shippers_current='', shippers_next='', factories_current='',
	factories_next='', warehouses_current='', warehouses_next='';
//************Upgrade initialization******************
	for (i=0; i<receivers.n.length; i++){						//n array is 13 long, but next and nextreqs are both 12 long..hmm..not causing errors though
		receivers_current+=receivers.current[i];
		inspectors_current+=inspectors.current[i];
		grinders_current+=grinders.current[i];
		mixers_current+=mixers.current[i];
		ovens_current+=ovens.current[i];
		dryers_current+=dryers.current[i];
		toasters_current+=toasters.current[i];
		frosters_current+=frosters.current[i];
		packers_current+=packers.current[i];
		shippers_current+=shippers.current[i];
		factories_current+=factories.current[i];
		warehouses_current+=warehouses.current[i];
		/*
		$('#current_receiver').append(receivers.current[i]);
		$('#next_receiver').append(receivers.next[i]);

		$('#current_inspector').append(inspectors.current[i]);
		$('#next_inspector').append(inspectors.next[i]);
		
		$('#current_grinder').append(grinders.current[i]);
		$('#next_grinder').append(grinders.next[i]);
		
		$('#current_mixer').append(mixers.current[i]);
		$('#next_mixer').append(mixers.next[i]);
		
		$('#current_oven').append(ovens.current[i]);
		$('#next_oven').append(ovens.next[i]);
		
		$('#current_dryer').append(dryers.current[i]);
		$('#next_dryer').append(dryers.next[i]);
		
		$('#current_toaster').append(toasters.current[i]);
		$('#next_toaster').append(toasters.next[i]);
		
		$('#current_froster').append(frosters.current[i]);
		$('#next_froster').append(frosters.next[i]);
		
		$('#current_packer').append(packers.current[i]);
		$('#next_packer').append(packers.next[i]);
		
		$('#current_shipper').append(shippers.current[i]);
		$('#next_shipper').append(shippers.next[i]);
		
		$('#current_factory').append(factories.current[i]);
		$('#next_factory').append(factories.next[i]);
		
		$('#current_warehouse').append(warehouses.current[i]);
		$('#next_warehouse').append(warehouses.next[i]);
		*/
	};
	for (i=0; i<receivers.n.length-2; i++){						
		receivers_next+=receivers.next[i];
		inspectors_next+=inspectors.next[i];
		grinders_next+=grinders.next[i];
		mixers_next+=mixers.next[i];
		ovens_next+=ovens.next[i];
		dryers_next+=dryers.next[i];
		toasters_next+=toasters.next[i];
		frosters_next+=frosters.next[i];
		packers_next+=packers.next[i];
		shippers_next+=shippers.next[i];
		factories_next+=factories.next[i];
		warehouses_next+=warehouses.next[i];
	}
	
		$('#current_receiver').append(receivers_current);			//new approach
		$('#next_receiver').append(receivers_next);

		$('#current_inspector').append(inspectors_current);
		$('#next_inspector').append(inspectors_next);
		
		$('#current_grinder').append(grinders_current);
		$('#next_grinder').append(grinders_next);
		
		$('#current_mixer').append(mixers_current);
		$('#next_mixer').append(mixers_next);
		
		$('#current_oven').append(ovens_current);
		$('#next_oven').append(ovens_next);
		
		$('#current_dryer').append(dryers_current);
		$('#next_dryer').append(dryers_next);
		
		$('#current_toaster').append(toasters_current);
		$('#next_toaster').append(toasters_next);
		
		$('#current_froster').append(frosters_current);
		$('#next_froster').append(frosters_next);
		
		$('#current_packer').append(packers_current);
		$('#next_packer').append(packers_next);
		
		$('#current_shipper').append(shippers_current);
		$('#next_shipper').append(shippers_next);
		
		$('#current_factory').append(factories_current);
		$('#next_factory').append(factories_next);
		
		$('#current_warehouse').append(warehouses_current);
		$('#next_warehouse').append(warehouses_next);
	
	for (i=0; i<receivers.n.length; i++){
		$('#c_receivers'+i).hide();             //genericize this with a function; unhide whatever the current thing is (keep track)
		$('#n_receivers_row'+i).hide();

		$('#c_inspectors'+i).hide();
		$('#n_inspectors_row'+i).hide();
		
		$('#c_grinders'+i).hide();
		$('#n_grinders_row'+i).hide();
		
		$('#c_mixers'+i).hide();
		$('#n_mixers_row'+i).hide();
		
		$('#c_ovens'+i).hide();
		$('#n_ovens_row'+i).hide();
		
		$('#c_dryers'+i).hide();
		$('#n_dryers_row'+i).hide();
		
		$('#c_toasters'+i).hide();
		$('#n_toasters_row'+i).hide();
		
		$('#c_frosters'+i).hide();
		$('#n_frosters_row'+i).hide();
		
		$('#c_packers'+i).hide();
		$('#n_packers_row'+i).hide();
		
		$('#c_shippers'+i).hide();
		$('#n_shippers_row'+i).hide();
		
		$('#c_factories'+i).hide();
		$('#n_factories_row'+i).hide();
		
		$('#c_warehouses'+i).hide();
		$('#n_warehouses_row'+i).hide();
	};
	/*
	$('#c_receivers0').show();                  //include in the genericized function (see above comment)
	$('#n_receivers_row1').show();
	
	$('#c_inspectors0').show();
	$('#n_inspectors_row1').show();
	
	$('#c_grinders0').show();
	$('#n_grinders_row1').show();
	
	$('#c_mixers0').show();
	$('#n_mixers_row1').show();
	
	$('#c_ovens0').show();
	$('#n_ovens_row1').show();
	
	$('#c_dryers0').show();
	$('#n_dryers_row1').show();
	
	$('#c_toasters0').show();
	$('#n_toasters_row1').show();
	
	$('#c_frosters0').show();
	$('#n_frosters_row1').show();
	
	$('#c_packers0').show();
	$('#n_packers_row1').show();
	
	$('#c_shippers0').show();
	$('#n_shippers_row1').show();
	
	$('#c_factories0').show();
	$('#n_factories_row1').show();
	
	$('#c_warehouses0').show();
	$('#n_warehouses_row1').show();
	*/
	
	//hide assembly line researchable steps
	$('#inspectors').hide();
	$('#grinders').hide();
	$('#dryers').hide();
	$('#toasters').hide();
	$('#frosters').hide();
	
	//TODO can probably delete this code since we can handle in the showAfterLoad function
	//show the first upgrade benefit                            //genericize
	$('#next_receivers_cost').html(prettify(receivers.ef[1]));
	$('#next_inspectors_cost').html(prettify(inspectors.ef[1]));
	$('#next_grinders_cost').html(prettify(grinders.ef[1]));
	$('#next_mixers_cost').html(prettify(mixers.ef[1]));
	$('#next_ovens_cost').html(prettify(ovens.ef[1]));
	$('#next_dryers_cost').html(prettify(dryers.ef[1]));
	$('#next_toasters_cost').html(prettify(toasters.ef[1]));
	$('#next_frosters_cost').html(prettify(frosters.ef[1]));
	$('#next_packers_cost').html(prettify(packers.ef[1]));
	$('#next_shippers_cost').html(prettify(shippers.ef[1]));
	$('#next_factories_cost').html(prettify(factories.staff[1]));
	$('#next_warehouses_cost').html(prettify(warehouses.stock[1]));
	
	$('#view_production').show();
	$('#view_business').hide();
	$('#view_creative').hide();
	
	$('#nextingrrowcost').html(prettify(pantry.row_cost));

//*******Progress unlocks to hide on startup***  (do this then check save file and unhide as appropriate)
    if (hidestuff==1){
        $('#nav_production').hide();//*
        $('#panel_assembly').hide();//*
    	
    	$('#nav_business').hide();//*
        $('#panel_staff').hide();//*
        $('#hireworkers').hide();//*
        $('#resources').hide();//*
    	$('#resources_stress').hide();//*
    
        $('#panel_buildings').hide();//*
    	$('#warehousesrow').hide();//*
    	$('#factoriesrow').hide();//*
    
        $('#nav_creative').hide();//*
        $('#panel_stressreductions').hide();//*
        $('#resources_sparks').hide();//*
    
        $('#panel_marketing').hide();//*
        $('#resources_fizz').hide();//*
    
        $('#hiremarketers').hide();//*
    
        $('#panel_research').hide();//*
        $('#resources_tech').hide();//*
    
        $('#hireengineers').hide();//*
    
        $('#panel_recipe').hide();//*
    }

	$('#ingredient2row').hide();
	$('#ingredient3row').hide();
	$('#ingredient4row').hide();

  	$('#panel_reports').hide();//*
	
	
	initialLoadSave(); //will also call showAfterLoad either via Load function or after Save
	updateGUI();
	
	//}
//*****************************************	
//*************Listeners*******************
//*****************************************

/*
	$('#makebox_column').hover(function(e){
		var pos = [e.pageX-150, e.pageY];
		$('#popup').css('left',pos[0]);      // TODO: fix this shenanigans
		$('#popup').css('top',pos[1]);
		$('#popup').css('display','inline');     
		$("#popup").css("position", "absolute");
	});
*/
	$('#nextingr1').click(function(){
		pantry.nextrecipe[0] = $('#nextingr1 option:selected').val();
		updateRecipeCost();
	});
	$('#nextingr2').click(function(){
		pantry.nextrecipe[1] = $('#nextingr2 option:selected').val();
		updateRecipeCost();
	});
	$('#nextingr3').click(function(){
		pantry.nextrecipe[2] = $('#nextingr3 option:selected').val();
		updateRecipeCost();
	});
	$('#nextingr4').click(function(){
		pantry.nextrecipe[3] = $('#nextingr4 option:selected').val();
		updateRecipeCost();
	});
	$('#nav_business').click(function(){
		$(this).addClass("active");
		$('#nav_production').removeClass("active");
		$('#nav_creative').removeClass("active");
		$('#view_business').show();
		$('#view_production').hide();
		$('#view_creative').hide();
	});	
	$('#nav_production').click(function(){
		$(this).addClass("active");
		$('#nav_business').removeClass("active");
		$('#nav_creative').removeClass("active");
		$('#view_business').hide();
		$('#view_production').show();
		$('#view_creative').hide();
	});
	$('#nav_creative').click(function(){
		$(this).addClass("active");
		$('#nav_production').removeClass("active");
		$('#nav_business').removeClass("active");
		$('#view_business').hide();
		$('#view_production').hide();
		$('#view_creative').show();
	});
	
	//**listen for ad campaign toggles
	$(function() {
    $('.campsclass').change(function(event) {
		var a = $(this).prop('checked');
		var i = event.target.id;
		//console.log(i+'checked = '+ a);
		toggleCampaign(i,a);
    });
	
	$('[title!=""]').qtip({
		style: {classes: 'qtip-cluetip qtip-shadow'}
	});
	
  })
});


function toggleCampaign(id,active){
	var idnumber = parseInt(id.slice(4,6));	//get the number of the toggle button clicked
	if (active == true){
		camps_active[idnumber]=1;
	}
	else{
		camps_active[idnumber]=0;
	}
};
  
initializePantry();
calcDemand();
openorders = 4; //have to seed this

//new stuff!
//initialLoadSave();

//updateGUI();

window.setInterval(function(){
	staffGetsPaid();
	workersProduce();	
	othersProduce();
	passTime();
	updateGUI();
	autosave();
}, 1000);