let Switcher = (function(){
    let THEMES = new Map([
        ["000_def_f65b1", {
            name: "Neopets Basic",
            rotations: 15
        }],
        ["014_yel_d187b", {
            name: "Neopets Yellow",
            rotations: 15
        }],
        ["015_red_062bf", {
            name: "Neopets Red",
            rotations: 15
        }],
        ["016_blu_e56fc", {
            name: "Neopets Blue",
            rotations: 15
        }],
        ["017_grn_f0c1a", {
            name: "Neopets Green",
            rotations: 15
        }],
        ["039_gry_2j9b4", {
            name: "Grey Day",
            rotations: 5
        }],
        ["045_jmp_af2015", {
            name: "JumpStart",
            rotations: 1
        }],
        ["040_klk_z0j87", {
            name: "Kiko Lake",
            rotations: 4
        }],
        ["041_myi_d3u7l", {
            name: "Mystery Island",
            rotations: 7
        }],
        ["042_roo_2s6am", {
            name: "Roo Island",
            rotations: 8
        }],
        ["043_tyr_e4uc5", {
            name: "Tyrannia",
            rotations: 7
        }],
        ["010_acp_6ffcb", {
            name: "Altador Cup",
            rotations: 16
        }],
        ["011_alc_c1d1c", {
            name: "Altadorian Constellations",
            rotations: 12
        }],
        ["024_aota_3db1f", {
            name: "Atlas of the Ancients",
            rotations: 10
        }],
        ["029_awk_15364", {
            name: "Battleground: Awakened",
            rotations: 6
        }],
        ["030_brt_19821", {
            name: "Battleground: Brute Squad",
            rotations: 6
        }],
        ["032_ord_635af", {
            name: "Battleground: Order of the Red Erisim",
            rotations: 6
        }],
        ["031_skr_8944c", {
            name: "Battleground: Seekers",
            rotations: 6
        }],
        ["034_tvg_yg724", {
            name: "Battleground: Thieves Guild",
            rotations: 6
        }],
        ["033_swy_82090", {
            name: "Battlegrounds: The Sway",
            rotations: 6
        }],
        ["008_com_e529a", {
            name: "Curse of Maraqua",
            rotations: 10
        }],
        ["012_tcg_d977a", {
            name: "Cyodrake's Gaze",
            rotations: 8
        }],
        ["023_dyd_c470b", {
            name: "Daily Dare",
            rotations: 10
        }],
        ["036_ddc_je4z0", {
            name: "Daily Dare: Chadley",
            rotations: 2
        }],
        ["046_ff_sep2017", {
            name: "Destroyed Faerie Festival",
            rotations: 4
        }],
        ["026_fon_f2c70", {
            name: "Festival of Neggs",
            rotations: 7
        }],
        ["038_hab_ig53k", {
            name: "Habitarium",
            rotations: 12
        }],
        ["004_bir_a2e60", {
            name: "Happy Birthday",
            rotations: 7
        }],
        ["003_hws_9bde9", {
            name: "Haunted Woods",
            rotations: 11
        }],
        ["028_kri_306cb", {
            name: "Krawk Island",
            rotations: 7
        }],
        ["037_hmh_f7k8s", {
            name: "Monster Hunting",
            rotations: 14
        }],
        ["018_prpl_f65b1", {
            name: "Neopets Purple",
            rotations: 9
        }],
        ["020_ppl_3c22d", {
            name: "Petpet Protection League",
            rotations: 15
        }],
        ["021_cpa_5ce03", {
            name: "Puzzle Adventure",
            rotations: 19
        }],
        ["009_qas_93707", {
            name: "Qasalan",
            rotations: 9
        }],
        ["022_lqc_d2d1a", {
            name: "Quizara's Curse",
            rotations: 9
        }],
        ["007_sfp_273a8", {
            name: "Space Faerie Premium",
            rotations: 4
        }],
        ["013_tow_4b54b", {
            name: "Tale of Woe",
            rotations: 10
        }],
        ["025_tfr_5ce03", {
            name: "The Faeries' Ruin",
            rotations: 8
        }],
        ["019_sloth1_7f914", {
            name: "The Return of Dr. Sloth",
            rotations: 13
        }],
        ["027_tkg_69097", {
            name: "Treasure Keepers",
            rotations: 11
        }],
        ["035_tmo_we6g3", {
            name: "Tyrannia: Mysterious Obelisk",
            rotations: 14
        }],
        ["006_val_d85a0", {
            name: "Valentine's Day",
            rotations: 9
        }],
        ["005_win_57061", {
            name: "Winter Holiday",
            rotations: 11
        }],
    ]);

    return {
        get: function (key) {
            return THEMES.get(key);
        },
        getName: function (key) {
            let entry = THEMES.get(key);
            if (entry) {
                return entry.name;
            } else {
                return entry;
            }
        },
        getRotations: function (key) {
            let entry = THEMES.get(key);
            if (entry) {
                return entry.rotations;
            } else {
                return entry;
            }
        },
        list: THEMES.keys()
    };

})();