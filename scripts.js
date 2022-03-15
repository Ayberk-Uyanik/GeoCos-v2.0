// Creating MAIN TABS //
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Creating COLLAPSIBLES //
var collapsibles = document.getElementsByClassName("collapsible");

for (let i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        }
        else {
            content.style.display = "block";
        }
    });
}

// Get the element with id="defaultOpen" and click on it //
document.getElementById("defaultOpen").click();

// Creating Go to Top Function //
//Get the button
let mybutton = document.getElementById("top_button");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Quick Look Analysis Alternative Function //
var cos = [];
var clicks = 0;
function quickLookCos() {
    let i;
    let coslist = document.getElementsByClassName("quick");
    clicks += 1;
    if (clicks == 1) {
        for (i = 0; i < coslist.length; i++) {
            cos.push(coslist[i].value);
        }
    }
    if (clicks > 1) {
        cos.length = 0;
        for (i = 0; i < coslist.length; i++) {
            cos.push(coslist[i].value);
        }
    }

    // Result displaying 
    let cos_result = cos.reduce((a, b) => a * b);
    let ultimate_cos;
    if (cos_result > 0 && cos_result < 1) {
        ultimate_cos = cos_result*100;
    } else {ultimate_cos=cos_result}
    
    document.getElementById("outcome").innerHTML = `% ${ultimate_cos.toFixed(2)}`

    // Control codes
    //alert("Click number is:" + clicks);
    //alert("CoS List is:" + cos);
    //alert("CoS result is:" + cos_result);
}

// Global Functions //
function convertToValue(element) {
    return element.options[element.selectedIndex].value
}

const cos_values = {
    "0.1" : 0.1,
    "0.2" : 0.2,
    "0.3" : 0.3,
    "0.4" : 0.4,
    "0.5" : 0.5,
    "0.6" : 0.6,
    "0.7" : 0.7,
    "0.8" : 0.8,
    "0.9" : 0.9,
    "1.0" : 1.0 ,
};

const cos_values_milkov = {
    "0.1" : 0.1,
    "0.15" : 0.15,
    "0.2" : 0.2,
    "0.25" : 0.25,
    "0.3" : 0.3,
    "0.35" : 0.35,
    "0.4" : 0.4,
    "0.45" : 0.45,
    "0.5" : 0.5,
    "0.55" : 0.55,
    "0.6" : 0.6,
    "0.65" : 0.65,
    "0.7" : 0.7,
    "0.75" : 0.75,
    "0.8" : 0.8,
    "0.85" : 0.85,
    "0.9" : 0.9,
    "0.95" : 0.95,
    "1.0" : 1.0 ,
};

// MILKOV'S APPROACH TAB //
// Source Rock // 
let numerical = document.getElementById("numerical");
let nonumerical = document.getElementById("nonumerical");
function hideDropdown() {
    if (numerical.checked) {
        document.getElementById("maturity").disabled = false
        document.getElementById("kerogen").disabled = true
    } else if (nonumerical.checked) {
        document.getElementById("maturity").disabled = true
        document.getElementById("kerogen").disabled = false
    }
}

let milkov_source_selected = document.getElementById("milkov_source_selected");
for(index in cos_values_milkov) {
    milkov_source_selected.options[milkov_source_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Source Rock Constants //
const list1 = [1.0, 0.9, 0.5, 0.8, 0.7];
const list2 = [0.8, 0.7, 0.25, 0.55, 0.45];
const list3 = [0.55, 0.45, 0.05, 0.3, 0.2];

// Source Rock Variables //
let milkov_maturity = document.getElementById("maturity");
let milkov_dhi = document.getElementById("dhi");
let milkov_kerogen = document.getElementById("kerogen");

// Source Rock Function //
function showCoS() {
    let maturity = milkov_maturity.options[milkov_maturity.selectedIndex].value;
    let dhi = milkov_dhi.options[milkov_dhi.selectedIndex].value;
    let kerogen = milkov_kerogen.options[milkov_kerogen.selectedIndex].value;
    let source_cos = document.getElementById("milkov_test");

    for (let i = 0; i < list1.length; i++) {
        if (numerical.checked && dhi == i) {
            if (maturity == 0) {
                source_cos.innerHTML = list1[i];
            } else if (maturity == 1) {
                source_cos.innerHTML = list2[i];
            } else if (maturity == 2) {
                source_cos.innerHTML = list3[i];
            }
        }
        if (nonumerical.checked && dhi == i) {
            if (kerogen == 0 || kerogen == 1) {
                source_cos.innerHTML = list1[i];
            }
            else if (kerogen == 2 || kerogen == 3) {
                source_cos.innerHTML = list2[i];
            } else if (kerogen == 4 || kerogen == 5) {
                source_cos.innerHTML = list3[i];
            }
        }
    }
}

// Migration //
let nomodel = document.getElementById("no_model");
function hideDropdownMigration() {
    if (nomodel.checked) {
        document.getElementById("migration_type").disabled = false
    } else {
        document.getElementById("migration_type").disabled = true
    }
}

let milkov_migration_selected = document.getElementById("milkov_migration_selected");
for(index in cos_values_milkov) {
    milkov_migration_selected.options[milkov_migration_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Migration Constants //
const list4 = [1.0, 0.55, 1.0, 0.55, 0.8];
const list5 = [0.9, 0.45, 0.9, 0.45, 0.7];
const list6 = [0.8, 0.3, 0.8, 0.3, 0.55];
const list7 = [0.7, 0.2, 0.7, 0.2, 0.45];
const list8 = [0.55, 0.1, 0.55, 0.1, 0.3];
const list9 = [0.45, 0.05, 0.45, 0.05, 0.2];

// Migration Function //
let milkov_migration = document.getElementById("migration1");
let nomigration = document.getElementById("lack_migration");
let migration_type = document.getElementById("migration_type");
let data_type = document.getElementById("migration_dhi");

function showMigrationCoS() {
    let type = migration_type.options[migration_type.selectedIndex].value;
    let data = data_type.options[data_type.selectedIndex].value;
    let migration_cos = document.getElementById("milkov_migration");

    for (let i = 0; i < list4.length; i++) {
        if (milkov_migration.checked && data == i) {
            migration_cos.innerHTML = list4[i];
        } else if (nomigration.checked && data == i) {
            migration_cos.innerHTML = list9[i];
        }

        if (nomodel.checked && data == i) {
            if (type == 0) {
                migration_cos.innerHTML = list5[i];
            } else if (type == 1) {
                migration_cos.innerHTML = list6[i];
            } else if (type == 2) {
                migration_cos.innerHTML = list7[i];
            } else if (type == 3) {
                migration_cos.innerHTML = list8[i];
            }
        }
    }
}

// Structure //
let seismic = document.getElementById("seismic_mapping");
let interpretation = document.getElementById("interpretation_ability");
let lines_2d = document.getElementById("seismic_2D_data");
let seismic_3d = document.getElementById("seismic_3D_data");
let lines = document.getElementById("number_of_lines");

function hideDropdownStructure() {
    let seismic_mapping = seismic.options[seismic.selectedIndex].value;

    if (seismic_mapping == 3) {
        interpretation.disabled = true
    } else { interpretation.disabled = false }

    if (lines_2d.checked) { lines.disabled = false }
    else { lines.disabled = true }
}

let milkov_structure_selected = document.getElementById("milkov_structure_selected");
for(index in cos_values_milkov) {
    milkov_structure_selected.options[milkov_structure_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Structure Constants //
// 3D Seismic Constants //
const list10 = [1.0, 0.95, 0.85];
const list11 = [0.8, 0.75, 0.7];
const list12 = [0.55, 0.5, 0.40];

// 2D Seismic Constants //
const list13 = [0.9, 0.8, 0.6];
const list14 = [0.85, 0.75, 0.55];
const list15 = [0.75, 0.7, 0.45];
const list16 = [0.7, 0.6, 0.35];
const list17 = [0.65, 0.5, 0.25];
const list18 = [0.55, 0.45, 0.2];
const list19 = [0.45, 0.35, 0.15];
const list20 = [0.4, 0.25, 0.1];
const list21 = [0.3, 0.2, 0.05];
const list22 = [0.25, 0.15, 0.05];

// Structure Function //
function showStructureCoS() {
    let seismic_mapping1 = seismic.options[seismic.selectedIndex].value;
    let ability = interpretation.options[interpretation.selectedIndex].value;
    let line_numbers = lines.options[lines.selectedIndex].value;
    let structure_cos = document.getElementById("milkov_structure");

    // 3D Seismic Conditions //
    for (let i = 0; i < list10.length; i++) {
        if (seismic_3d.checked && ability == i) {
            if (seismic_mapping1 == 0) {
                structure_cos.innerHTML = list10[i];
            } else if (seismic_mapping1 == 1) {
                structure_cos.innerHTML = list11[i];
            } else if (seismic_mapping1 == 2) {
                structure_cos.innerHTML = list12[i];
            } else if (seismic_mapping1 == 3) {
                structure_cos.innerHTML = 0.35;
            }
        }
        // 2D Seismic Conditions //  
        if (lines_2d.checked && line_numbers == i) {
            if (seismic_mapping1 == 0) {
                if (ability == 0) {
                    structure_cos.innerHTML = list13[i];
                } else if (ability == 1) {
                    structure_cos.innerHTML = list14[i];
                } else if (ability == 2) {
                    structure_cos.innerHTML = list15[i];
                }
            }
            if (seismic_mapping1 == 1) {
                if (ability == 0) {
                    structure_cos.innerHTML = list16[i];
                } else if (ability == 1) {
                    structure_cos.innerHTML = list17[i];
                } else if (ability == 2) {
                    structure_cos.innerHTML = list18[i];
                }
            }
            if (seismic_mapping1 == 2) {
                if (ability == 0) {
                    structure_cos.innerHTML = list19[i];
                } else if (ability == 1) {
                    structure_cos.innerHTML = list20[i];
                } else if (ability == 2) {
                    structure_cos.innerHTML = list21[i];
                }
            }
            if (seismic_mapping1 == 3) {
                structure_cos.innerHTML = list22[i];
            }
        }
    }
}

// Reservoir Facies //
let environment = document.getElementById("environment");
let marine = document.getElementById("marine_facies");
let continental = document.getElementById("continental_facies");
let well_data = document.getElementById("well_data");
let presence = document.getElementById("reservoir_presence");
let seismic_presence = document.getElementById("presence_seismic");

function hideDropdownFacies() {
    let deposition = environment.options[environment.selectedIndex].value;
    let wells = well_data.options[well_data.selectedIndex].value;
    // Model existence dropdowns //
    if (deposition == 0) {
        marine.disabled = false
        continental.disabled = true
    }
    else if (deposition == 1) {
        continental.disabled = false
        marine.disabled = true
    }
    else if (deposition == 2) {
        marine.disabled = true
        continental.disabled = true
    }
    // Data existence dropdowns //
    if (wells == 0) {
        presence.disabled = false
        seismic_presence.disabled = true
    } else if (wells == 1) {
        presence.disabled = true
        seismic_presence.disabled = false
    }
}

let milkov_facies_selected = document.getElementById("milkov_facies_selected");
for(index in cos_values_milkov) {
    milkov_facies_selected.options[milkov_facies_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Facies Constants //
const list23 = [1.0, 0.95, 0.85, 0.6];
const list24 = [1.0, 0.9, 0.8, 0.55];
const list25 = [0.75, 0.65, 0.45, 0.2];
const list26 = [0.95, 0.85, 0.7, 0.45];
const list27 = [0.9, 0.8, 0.7, 0.45];
const list28 = [0.85, 0.75, 0.6, 0.35];
const list29 = [0.8, 0.7, 0.5, 0.25];
const list30 = [0.55, 0.45, 0.25, 0.05];
const list31 = [0.95, 0.85];
const list32 = [0.9, 0.8];
const list33 = [0.65, 0.45];
const list34 = [0.85, 0.7];
const list35 = [0.8, 0.7];
const list36 = [0.75, 0.6];
const list37 = [0.7, 0.5];
const list38 = [0.45, 0.25];

// Facies Function //
function showFaciesCoS() {
    let depositional_environment = environment.options[environment.selectedIndex].value;
    let marine_facies = marine.options[marine.selectedIndex].value;
    let continental_facies = continental.options[continental.selectedIndex].value;
    let well_data1 = well_data.options[well_data.selectedIndex].value;
    let reservoir_presence = presence.options[presence.selectedIndex].value;
    let seismic_presence1 = seismic_presence.options[seismic_presence.selectedIndex].value;
    let facies_cos = document.getElementById("milkov_facies");

    for (let i = 0; i < list23.length; i++) {
        if (reservoir_presence == i) {
            if (depositional_environment == 0 && well_data1 == 0) {
                if (marine_facies == 0) {
                    facies_cos.innerHTML = list23[i];
                } else if (marine_facies == 1) {
                    facies_cos.innerHTML = list24[i];
                } else if (marine_facies == 2) {
                    facies_cos.innerHTML = list25[i];
                }
            }
            if (depositional_environment == 1 && well_data1 == 0) {
                if (continental_facies == 0) {
                    facies_cos.innerHTML = list26[i];
                } else if (continental_facies == 1) {
                    facies_cos.innerHTML = list27[i];
                } else if (continental_facies == 2) {
                    facies_cos.innerHTML = list28[i];
                } else if (continental_facies == 3) {
                    facies_cos.innerHTML = list29[i];
                }
            }
            if (depositional_environment == 2 && well_data1 == 0) {
                facies_cos.innerHTML = list30[i];
            }
        }
    }

    for (let i = 0; i < list32.length; i++) {
        if (seismic_presence1 == i) {
            if (depositional_environment == 0 && well_data1 == 1) {
                if (marine_facies == 0) {
                    facies_cos.innerHTML = list31[i];
                } else if (marine_facies == 1) {
                    facies_cos.innerHTML = list32[i];
                } else if (marine_facies == 2) {
                    facies_cos.innerHTML = list33[i];
                }
            }
            if (depositional_environment == 1 && well_data1 == 1) {
                if (continental_facies == 0) {
                    facies_cos.innerHTML = list34[i];
                } else if (continental_facies == 1) {
                    facies_cos.innerHTML = list35[i];
                } else if (continental_facies == 2) {
                    facies_cos.innerHTML = list36[i];
                } else if (continental_facies == 3) {
                    facies_cos.innerHTML = list37[i];
                }
            }
            if (depositional_environment == 2 && well_data1 == 1) {
                facies_cos.innerHTML = list38[i];
            }
        }
    }
}

// Reservoir Deliverability //
let reservoir_lithology = document.getElementById("reservoir_lithology");
let reservoir_model = document.getElementById("reservoir_model_availability");
let reservoir_temperature_clastics = document.getElementById("reservoir_temperature_clastics");
let reservoir_temperature_carbonates = document.getElementById("reservoir_temperature_carbonates");
let reservoir_facies1 = document.getElementById("reservoir_facies1");
let reservoir_facies2 = document.getElementById("reservoir_facies2");
let reservoir_facies3 = document.getElementById("reservoir_facies3");
let reservoir_facies4 = document.getElementById("reservoir_facies4");
let reswell_data = document.getElementById("reswell_data");

function hideDropdownDeliverability() {
    let lithology = reservoir_lithology[reservoir_lithology.selectedIndex].value;
    let model = reservoir_model[reservoir_model.selectedIndex].value;
    let clastics_temperature = reservoir_temperature_clastics[reservoir_temperature_clastics.selectedIndex].value;
    let carbonates_temperature = reservoir_temperature_carbonates[reservoir_temperature_carbonates.selectedIndex].value;

    if (model == 2) {
        if (lithology == 0) {
            reservoir_temperature_clastics.disabled = false
            reservoir_temperature_carbonates.disabled = true
        } else if (lithology == 1) {
            reservoir_temperature_carbonates.disabled = false
            reservoir_temperature_clastics.disabled = true
        }
    } else if (model == 0 || model == 1) {
        reservoir_temperature_carbonates.disabled = true
        reservoir_temperature_clastics.disabled = true
    }

    if (clastics_temperature == 0) {
        reservoir_facies1.disabled = true
        reservoir_facies2.disabled = true
    } else if (clastics_temperature == 1) {
        reservoir_facies1.disabled = false
        reservoir_facies2.disabled = true
    } else if (clastics_temperature == 2) {
        reservoir_facies1.disabled = true
        reservoir_facies2.disabled = false
    }

    if (carbonates_temperature == 0) {
        reservoir_facies3.disabled = true
        reservoir_facies4.disabled = true
    } else if (carbonates_temperature == 1) {
        reservoir_facies3.disabled = false
        reservoir_facies4.disabled = true
    } else if (carbonates_temperature == 2) {
        reservoir_facies3.disabled = true
        reservoir_facies4.disabled = false
    }
}

let milkov_deliverability_selected = document.getElementById("milkov_deliverability_selected");
for(index in cos_values_milkov) {
    milkov_deliverability_selected.options[milkov_deliverability_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Deliverability Constants //
const deliver_values = {
    list39: [1.0, 0.95, 0.8, 0.55, 0.75],
    list40: [0.95, 0.8, 0.7, 0.45, 0.65],
    list41: [0.85, 0.75, 0.55, 0.3, 0.5],
    list42: [0.75, 0.6, 0.45, 0.2, 0.4],
    list43: [0.65, 0.55, 0.35, 0.15, 0.3],
    list44: [0.55, 0.45, 0.25, 0.1, 0.2],
    list45: [0.5, 0.4, 0.2, 0.05, 0.15]
}

// Deliverability Function //
function showDeliverabilityCoS() {
    let lithology_type = reservoir_lithology[reservoir_lithology.selectedIndex].value;
    let model_type = reservoir_model[reservoir_model.selectedIndex].value;
    let temperature_clastics = reservoir_temperature_clastics[reservoir_temperature_clastics.selectedIndex].value;
    let temperature_carbonates = reservoir_temperature_carbonates[reservoir_temperature_carbonates.selectedIndex].value;
    let facies1 = reservoir_facies1[reservoir_facies1.selectedIndex].value;
    let facies2 = reservoir_facies2[reservoir_facies2.selectedIndex].value;
    let facies3 = reservoir_facies3[reservoir_facies3.selectedIndex].value;
    let facies4 = reservoir_facies4[reservoir_facies4.selectedIndex].value;
    let data_existence = reswell_data[reswell_data.selectedIndex].value;
    let deliver_cos = document.getElementById("milkov_deliverability");

    for (let i = 0; i < deliver_values.list39.length; i++) {
        if (lithology_type == 0 || lithology_type == 1) {
            if (data_existence == i) {
                if (model_type == i * 0) {
                    deliver_cos.innerHTML = deliver_values.list39[i];
                } else if (model_type == i * 0 + 1) {
                    deliver_cos.innerHTML = deliver_values.list45[i];
                } else if (model_type == i * 0 + 2 && temperature_clastics == i * 0 || temperature_carbonates == i * 0) {
                    deliver_cos.innerHTML = deliver_values.list40[i];
                }

                if (model_type == i * 0 + 2) {
                    if (temperature_clastics == i * 0 + 1 || temperature_carbonates == i * 0 + 1) {
                        if (facies1 == i * 0 || facies3 == i * 0) {
                            deliver_cos.innerHTML = deliver_values.list41[i];
                        } else if (facies1 == i * 0 + 1 || facies3 == i * 0 + 1) {
                            deliver_cos.innerHTML = deliver_values.list42[i];
                        }
                    } else if (temperature_clastics == i * 0 + 2 || temperature_carbonates == i * 0 + 2) {
                        if (facies2 == i * 0 || facies4 == i * 0) {
                            deliver_cos.innerHTML = deliver_values.list43[i];
                        } else if (facies2 == i * 0 + 1 || facies4 == i * 0 + 1) {
                            deliver_cos.innerHTML = deliver_values.list44[i];
                        }
                    }
                }
            }
        }
    }
}

// Seal //
let seal_type = document.getElementById("seal_type");
let top_seal1 = document.getElementById("top_seal1");
let top_seal2 = document.getElementById("top_seal2");
let bottom_seal = document.getElementById("bottom_seal");
let trap_style = document.getElementById("trap_style");
let seal_quality = document.getElementById("seal_quality");

function hideDropdownSeals() {
    let type_seal = seal_type[seal_type.selectedIndex].value;
    let seal_top2 = top_seal2[top_seal2.selectedIndex].value;

    if (type_seal == 0) {
        top_seal1.disabled = false
        top_seal2.disabled = true
    } else if (type_seal == 1) {
        top_seal1.disabled = true
        top_seal2.disabled = false
    }

    if (type_seal == 1) {
        if (seal_top2 == 0) {
            trap_style.disabled = false
            bottom_seal.disabled = true
        } else if (seal_top2 == 1) {
            trap_style.disabled = true
            bottom_seal.disabled = false
        } else if (seal_top2 == 2) {
            trap_style.disabled = true
            bottom_seal.disabled = true
        }
    }
}

let milkov_seal_selected = document.getElementById("milkov_seal_selected");
for(index in cos_values_milkov) {
    milkov_seal_selected.options[milkov_seal_selected.options.length] = new Option(cos_values_milkov[index], index);
};

// Seal Constants //
const seal_values = {
    list46: [1.0, 0.95, 0.8, 0.55, 0.75],
    list47: [0.95, 0.85, 0.7, 0.45, 0.65],
    list48: [0.85, 0.75, 0.55, 0.30, 0.50],
    list49: [0.8, 0.7, 0.5, 0.25, 0.45],
    list50: [0.75, 0.65, 0.45, 0.2, 0.4],
    list51: [0.5, 0.35, 0.2, 0.05, 0.15],
    list52: [0.65, 0.50, 0.30, 0.10, 0.25],
    list53: [0.55, 0.45, 0.25, 0.1, 0.2]
}

// Seal Function //
function showSealCoS() {
    let pick_seal = seal_type[seal_type.selectedIndex].value;
    let top_seal = top_seal1[top_seal1.selectedIndex].value;
    let seal_top = top_seal2[top_seal2.selectedIndex].value;
    let style = trap_style[trap_style.selectedIndex].value;
    let seal_bottom = bottom_seal[bottom_seal.selectedIndex].value;
    let quality = seal_quality[seal_quality.selectedIndex].value;
    let seal_cos = document.getElementById("milkov_seal");

    for (let i = 0; i < seal_values.list46.length; i++) {
        if (quality == i) {
            if (pick_seal == 0) {
                if (top_seal == 0) {
                    seal_cos.innerHTML = seal_values.list46[i];
                } else if (top_seal == 1) {
                    seal_cos.innerHTML = seal_values.list47[i];
                }
            } else if (pick_seal == 1) {
                if (seal_top == 0) {
                    if (style == 0) {
                        seal_cos.innerHTML = seal_values.list47[i];
                    } else if (style == 1) {
                        seal_cos.innerHTML = seal_values.list48[i];
                    } else if (style == 2) {
                        seal_cos.innerHTML = seal_values.list49[i];
                    } else if (style == 3) {
                        seal_cos.innerHTML = seal_values.list50[i];
                    } else if (style == 4) {
                        seal_cos.innerHTML = seal_values.list51[i];
                    }
                } else if (seal_top == 1) {
                    if (seal_bottom == 0) {
                        seal_cos.innerHTML = seal_values.list47[i];
                    } else if (seal_bottom == 1) {
                        seal_cos.innerHTML = seal_values.list50[i];
                    } else if (seal_bottom == 2) {
                        seal_cos.innerHTML = seal_values.list52[i];
                    }
                } else if (seal_top == 2) {
                    seal_cos.innerHTML = seal_values.list51[i];
                }
            }
        }
    }
}

// Milkov Cumulative COS Function //
function displayCumulativeCos () {
    let milkov_source_cos = milkov_source_selected.value;
    let milkov_migration_cos = milkov_migration_selected.value;
    let milkov_structure_cos = milkov_structure_selected.value;
    let milkov_facies_cos = milkov_facies_selected.value;
    let milkov_deliverability_cos = milkov_deliverability_selected.value;
    let milkov_seal_cos = milkov_seal_selected.value;

    let milkov_cumulative_cos = (milkov_source_cos*milkov_migration_cos*
        milkov_structure_cos*milkov_facies_cos*milkov_deliverability_cos*
        milkov_seal_cos)*100;
    
    let cumulative_result = document.getElementById("milkov_cumulative_cos");
    cumulative_result.innerHTML = `% ${milkov_cumulative_cos.toFixed(2)}`
}

// Malvic Results Summary //
let milkov_results_y = [];
var milkov_clicks = 0;
let milkov_click = document.getElementById("milkov_click");
milkov_click.addEventListener ("click", function () {
    // Milkov Results //
    let milk_source_cos = convertToValue (milkov_source_selected);
    let milk_migration_cos = convertToValue (milkov_migration_selected);
    let milk_structure_cos = convertToValue (milkov_structure_selected);
    let milk_facies_cos = convertToValue (milkov_facies_selected);
    let milk_deliverability_cos = convertToValue (milkov_deliverability_selected);
    let milk_seal_cos = convertToValue (milkov_seal_selected);

    milkov_clicks += 1;
    if (milkov_clicks==1) {
        milkov_results_y.push (
            milk_source_cos, 
            milk_facies_cos*milk_deliverability_cos, 
            milk_migration_cos, 
            milk_structure_cos, 
            milk_seal_cos
        )
    } else if (milkov_clicks > 1) {
        milkov_results_y.length = 0;
        milkov_results_y.push (
            milk_source_cos, 
            milk_facies_cos*milk_deliverability_cos, 
            milk_migration_cos, 
            milk_structure_cos, 
            milk_seal_cos
        )
    }

    alert (`Milkov's Approach Summary: \n Source Rock CoS: ${milk_source_cos}\n Reservoir Rock CoS: ${(milk_facies_cos * milk_deliverability_cos).toFixed(2)}\n Migration CoS: ${milk_migration_cos}\n Trap CoS: ${milk_structure_cos}\n Preservation CoS: ${milk_seal_cos}`
    )
    return milkov_results_y
})

// CROATIAN APPROACH TAB //
// Source Rock CoS //
let facies = document.getElementById("malvic_source");
let maturity = document.getElementById("malvic_maturity");
let data_sources = document.getElementById("malvic_data_sources");

function malvicSource() {
    let source_result = (facies.options[facies.selectedIndex].value * maturity.options[maturity.selectedIndex].value * data_sources.options[data_sources.selectedIndex].value) * 100;
    document.getElementById("test").innerHTML = `% ${source_result.toFixed(2)}`
}

// Migration CoS //
let shows = document.getElementById("malvic_hc_shows");
let trap_position = document.getElementById("malvic_trap_position");
let timing = document.getElementById("malvic_timing");

function malvicMigration() {
    let migration_result = (shows.options[shows.selectedIndex].value * trap_position.options[trap_position.selectedIndex].value * timing.options[timing.selectedIndex].value) * 100;
    document.getElementById("migration_cos").innerHTML = `% ${migration_result.toFixed(2)}`
}

// Reservoir CoS //
let reservoir_type = document.getElementById("malvic_reservoir_type");
let porosity = document.getElementById("malvic_porosity");

function malvicReservoir() {
    let reservoir_result = (reservoir_type.options[reservoir_type.selectedIndex].value * porosity.options[porosity.selectedIndex].value) * 100;
    document.getElementById("reservoir_cos").innerHTML = `% ${reservoir_result.toFixed(2)}`
}

// Trap CoS //
let structural = document.getElementById("malvic_structural_trap");
let stratigraphic = document.getElementById("malvic_stratigraphic_trap");
let cap_rock = document.getElementById("malvic_cap_rock");

function malvicTrap() {
    let trap_result = (structural.options[structural.selectedIndex].value * stratigraphic.options[stratigraphic.selectedIndex].value * cap_rock.options[cap_rock.selectedIndex].value) * 100;
    document.getElementById("trap_cos").innerHTML = `% ${trap_result.toFixed(2)}`
}

// Preservation CoS //
let pressure = document.getElementById("malvic_pressure");
let water = document.getElementById("malvic_water");

function malvicPreservation() {
    let preservation_result = (pressure.options[pressure.selectedIndex].value * water.options[water.selectedIndex].value) * 100;
    document.getElementById("preservation_cos").innerHTML = `% ${preservation_result.toFixed(2)}`
}

// Ultimate CoS Calculation //
function malvicCos() {
    let malvic_result = (facies.options[facies.selectedIndex].value * maturity.options[maturity.selectedIndex].value * data_sources.options[data_sources.selectedIndex].value) * (shows.options[shows.selectedIndex].value * trap_position.options[trap_position.selectedIndex].value * timing.options[timing.selectedIndex].value) * (reservoir_type.options[reservoir_type.selectedIndex].value * porosity.options[porosity.selectedIndex].value) * (structural.options[structural.selectedIndex].value * stratigraphic.options[stratigraphic.selectedIndex].value * cap_rock.options[cap_rock.selectedIndex].value) * (pressure.options[pressure.selectedIndex].value * water.options[water.selectedIndex].value) * 100;
    document.getElementById("full_cos").innerHTML = `% ${malvic_result.toFixed(2)}`
}

let malvic_click = document.getElementById("malvic_click");

// Malvic Results Summary //
let croatian_results_y = [];
var malvic_clicks = 0;
malvic_click.addEventListener ("click", function () {
    // Source Rock //
    let malvic_facies = convertToValue(facies);
    let malvic_maturity = convertToValue(maturity);
    let malvic_sources = convertToValue(data_sources);
    let croatian_source = malvic_facies*malvic_maturity*malvic_sources

    // Migration //
    let malvic_shows = convertToValue(shows);
    let malvic_position = convertToValue(trap_position);
    let malvic_timing = convertToValue(timing);
    let croatian_migration = malvic_shows*malvic_position*malvic_timing

    // Reservoir //
    let malvic_reservoir = convertToValue(reservoir_type);
    let malvic_porosity = convertToValue(porosity);
    let croatian_reservoir = malvic_reservoir*malvic_porosity

    // Trap //
    let malvic_structural = convertToValue(structural);
    let malvic_stratigraphic = convertToValue(stratigraphic);
    let malvic_caprock = convertToValue(cap_rock);
    let croatian_trap = malvic_structural*malvic_stratigraphic*malvic_caprock

    // Preservation //
    let malvic_pressure = convertToValue(pressure);
    let malvic_water = convertToValue(water);
    let croatian_preservation = malvic_pressure*malvic_water
    malvic_clicks += 1;
    if (malvic_clicks==1) {
        croatian_results_y.push (
            croatian_source, croatian_reservoir, 
            croatian_migration, croatian_trap,
            croatian_preservation
        )
    } else if (malvic_clicks > 1) {
        croatian_results_y.length = 0;
        croatian_results_y.push (
            croatian_source, croatian_reservoir, 
            croatian_migration, croatian_trap,
            croatian_preservation
        )
    }

    alert ("Malvic's Approach Summary: \n Source Rock CoS: " + 
    croatian_source.toFixed(2) + "\n Reservoir Rock CoS: " + croatian_reservoir.toFixed(2) +
    "\n Migration CoS: " + croatian_migration.toFixed(2) +
    "\n Trap CoS: " + croatian_trap.toFixed(2) +
    "\n Preservation CoS: " + croatian_preservation.toFixed(2)
    )
    return croatian_results_y
})

// CCOP APPROACH TAB //
// CCOP Source Rock //
let cnooc_source = document.getElementById("cnooc_source_presence");
let cnooc_maturity = document.getElementById("cnooc_source_maturity");
let cnooc_source_depo = document.getElementById("cnooc_source_environment");

let ccop_source_selected = document.getElementById("ccop_source_selected");
for(index in cos_values) {
    ccop_source_selected.options[ccop_source_selected.options.length] = new Option(cos_values[index], index);
};

// Source Rock Constants //
const cnooc_source_values = {
    list54 : ["0.9-1.0", "0.8-1.0", "0.8-1.0"],
    list55 : ["0.5-0.8", "0.4-0.7", "0.4-0.7"],
    list56 : ["0.3-0.6", "0.2-0.5", "0.2-0.5"],
    list57 : ["0.7-0.9", "0.6-0.8", "0.6-0.8"],
    list58 : ["0.4-0.6", "0.3-0.6", "0.3-0.6"],
    list59 : ["0.2-0.5", "0.1-0.4", "0.1-0.4"],
    list60 : ["0.5-0.8", "0.4-0.7", "0.4-0.7"],
    list61 : ["0.3-0.7", "0.3-0.6", "0.3-0.6"],
    list62 : ["0.1-0.4", "0.1-0.4", "0.1-0.4"],
    list63 : ["0.4-0.7", "0.3-0.7", "0.3-0.7"],
    list64 : ["0.2-0.6", "0.2-0.5", "0.2-0.5"],
    list65 : ["0.1-0.4", "0.1-0.3", "0.1-0.3"]
}

// Source Rock Function //
function cnoocSourceCos() {
    let source = convertToValue(cnooc_source);
    let maturity = convertToValue(cnooc_maturity);
    let depo_envi = convertToValue(cnooc_source_depo);
    let cnooc_source_cos = document.getElementById("cnooc_source_cos");

    for (let i = 0; i < cnooc_source_values.list54.length; i++) {
        if (source == 0) {
            if (depo_envi == i) {
                if (maturity == 0) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list54[i]; 
                } else if (maturity == 1) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list55[i];
                } else if (maturity == 2) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list56[i];
                }
            }
        } else if (source == 1) {
            if (depo_envi == i) {
                if (maturity == 0) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list57[i]; 
                } else if (maturity == 1) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list58[i];
                } else if (maturity == 2) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list59[i];
                }
            }
        } else if (source == 2) {
            if (depo_envi == i) {
                if (maturity == 0) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list60[i]; 
                } else if (maturity == 1) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list61[i];
                } else if (maturity == 2) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list62[i];
                }
            }
        } else if (source == 3) {
            if (depo_envi == i) {
                if (maturity == 0) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list63[i]; 
                } else if (maturity == 1) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list64[i];
                } else if (maturity == 2) {
                    cnooc_source_cos.innerHTML = cnooc_source_values.list65[i];
                }
            }
        }
    }
}

// CCOP Migration //
let cnooc_migration_type = document.getElementById("cnooc_migration_type");
let cnooc_timing = document.getElementById("cnooc_timing");

let ccop_migration_selected = document.getElementById("ccop_migration_selected");
for(index in cos_values) {
    ccop_migration_selected.options[ccop_migration_selected.options.length] = new Option(cos_values[index], index);
};

// CCOP Migration Constants //
const cnooc_migration_values = {
    list66 : ["0.9-1.0", "0.4-0.8", "0.1-0.4"],
    list67 : ["0.8-0.9", "0.4-0.7", "0.1-0.3"],
    list68 : ["0.5-0.8", "0.2-0.5", "0.1-0.3"],
    list69 : ["0.7-0.9", "0.3-0.6", "0.1-0.3"],
    list70 : ["0.4-0.6", "0.2-0.4", "0.1-0.2"],
    list71 : ["0.4-0.6", "0.2-0.4", "0.1-0.2"],
    list72 : ["0.2-0.4", "0.1-0.3", "0.1"]
}

// CCOP Migration Function //
function cnoocMigrationCos () {
    let type_migration = convertToValue (cnooc_migration_type);
    let timing = convertToValue (cnooc_timing);
    let cnooc_migration_cos = document.getElementById("cnooc_migration_cos");

    for (let i=0; i < cnooc_migration_values.list66.length; i ++) {
        if (timing == i) {
            if (type_migration == 0) {
                cnooc_migration_cos.innerHTML = cnooc_migration_values.list66[i];
            } else if (type_migration == 1) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list67[i];}
              else if (type_migration == 2) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list68[i];}
              else if (type_migration == 3) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list69[i];}
              else if (type_migration == 4) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list70[i];}
              else if (type_migration == 5) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list71[i];}
              else if (type_migration == 6) {cnooc_migration_cos.innerHTML = cnooc_migration_values.list72[i];}
        }
    }
}

// CCOP Preservation //
let cnooc_preservation_type = document.getElementById("cnooc_preservation_type");
let data_control = document.getElementById("data_control");
let cnooc_process1 = document.getElementById("process_type_1");
let cnooc_process2 = document.getElementById("process_type_2");
let cnooc_process3 = document.getElementById("process_type_3");
let cnooc_process4 = document.getElementById("process_type_4");

let ccop_preserve_selected = document.getElementById("ccop_preserve_selected");
for(index in cos_values) {
    ccop_preserve_selected.options[ccop_preserve_selected.options.length] = new Option(cos_values[index], index);
};

// Dropdown Hide Function //
function hideDropdownCnoocPreservation() {
    preservation_type = convertToValue(cnooc_preservation_type);
    
    // Model existence dropdowns //
    if (preservation_type == 0) {
        cnooc_process1.disabled = false
        cnooc_process2.disabled = true
        cnooc_process3.disabled = true
        cnooc_process4.disabled = true
    }
    else if (preservation_type == 1) {
        cnooc_process1.disabled = true
        cnooc_process2.disabled = false
        cnooc_process3.disabled = true
        cnooc_process4.disabled = true
    }
    else if (preservation_type == 2) {
        cnooc_process1.disabled = true
        cnooc_process2.disabled = true
        cnooc_process3.disabled = false
        cnooc_process4.disabled = true
    } 
    else if (preservation_type == 3) {
        cnooc_process1.disabled = true
        cnooc_process2.disabled = true
        cnooc_process3.disabled = true
        cnooc_process4.disabled = false
    }  
}

// CCOP Preservation Constants //
const cnooc_preservation_values = {
    list73 : ["0.9-1.0", "0.8-1.0", "0.7-0.1"],
    list74 : ["0.8-0.9", "0.4-0.7", "0.1-0.3"],
    list75 : ["0.7-0.9", "0.3-0.6", "0.1-0.3"],
    list76 : ["0.5-0.8", "0.2-0.5", "0.1-0.2"],
    list77 : ["0.7-0.9", "0.4-0.7", "0.2-0.4"],
    list78 : ["0.5-0.6", "0.3-0.4", "0.1-0.2"],
    list79 : ["0.5-0.7", "0.4-0.5", "0.3-0.4"],
    list80 : ["0.4-0.6", "0.3-0.4", "0.1-0.3"]
}

// CCOP Preservation Function //
function cnoocPreservationCoS () {
    preservation_types = convertToValue(cnooc_preservation_type);
    data = convertToValue(data_control);
    process1 = convertToValue(cnooc_process1);
    process2 = convertToValue(cnooc_process2);
    process3 = convertToValue(cnooc_process3);
    process4 = convertToValue(cnooc_process4);
    let cnooc_preservation_cos = document.getElementById("cnooc_preservation_cos");

    for (let i=0; i<cnooc_preservation_values.list73.length; i++) {
        if (data == i) {
            if (preservation_types == 0) {
                if (process1 == 0) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list73[i];                           
                } else if (process1 == 1) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list74[i];
                }
            } else if (preservation_types == 1) {
                if (process2 == 0) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list75[i];                           
                } else if (process2 == 1) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list76[i];
                }
            } else if (preservation_types == 2) {
                if (process3 == 0) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list77[i];                           
                } else if (process3 == 1) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list78[i];
                }
            } else if (preservation_types == 3) {
                if (process4 == 0) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list79[i];                           
                } else if (process4 == 1) {
                    cnooc_preservation_cos.innerHTML = cnooc_preservation_values.list80[i];
                }
            }        
        }   
    }   
}

// CCOP Reservoir //
// Reservoir Presence Inputs //
let cnooc_reservoir_type = document.getElementById("cnooc_reservoir_type");
let data_quality = document.getElementById("cnooc_reservoir_data_quality");
let cnooc_reservoir_facies1 = document.getElementById("cnooc_reservoir_type1");
let cnooc_reservoir_facies2 = document.getElementById("cnooc_reservoir_type2");
let cnooc_reservoir_facies3 = document.getElementById("cnooc_reservoir_type3");

// Reservoir Presence Dropdown Hide Function //
function hideDropdownCnoocReservoir() {
    cnooc_reservoir_environment = convertToValue(cnooc_reservoir_type);
    
    if (cnooc_reservoir_environment == 0) {
        cnooc_reservoir_facies1.disabled = false
        cnooc_reservoir_facies2.disabled = true
        cnooc_reservoir_facies3.disabled = true
    } else if (cnooc_reservoir_environment == 1) {
        cnooc_reservoir_facies1.disabled = true
        cnooc_reservoir_facies2.disabled = false
        cnooc_reservoir_facies3.disabled = true
    } else if (cnooc_reservoir_environment == 2) {
        cnooc_reservoir_facies1.disabled = true
        cnooc_reservoir_facies2.disabled = true
        cnooc_reservoir_facies3.disabled = false
    }
}

let ccop_facies_selected = document.getElementById("ccop_facies_selected");
for(index in cos_values) {
    ccop_facies_selected.options[ccop_facies_selected.options.length] = new Option(cos_values[index], index);
};

// Reservoir Facies Constants //
const cnooc_reservoir_facies_values = {
    list81 : ["0.9-1.0", "0.7-0.8", "0.6-0.7", "0.4-0.6"],
    list82 : ["0.8-1.0", "0.7-0.8", "0.6-0.7", "0.4-0.6"],
    list83 : ["0.7-0.8", "0.5-0.6", "0.3-0.5", "0.1-0.3"],
    list84 : ["0.8-1.0", "0.6-0.8", "0.5-0.7", "0.3-0.5"],
    list85 : ["0.7-0.9", "0.5-0.7", "0.4-0.6", "0.3-0.5"],
    list86 : ["0.8-1.0", "0.6-0.8", "0.4-0.6", "0.4-0.6"],
    list87 : ["0.4-0.6", "0.3-0.5", "0.2-0.4", "0.1-0.3"],
}

// Reservoir Facies Function //
function cnoocReservoirFaciesCos () {
    cnooc_facies_type = convertToValue(cnooc_reservoir_type);
    cnooc_reservoir_quality = convertToValue(data_quality);
    cnooc_facies1 = convertToValue(cnooc_reservoir_facies1);
    cnooc_facies2 = convertToValue(cnooc_reservoir_facies2);
    cnooc_facies3 = convertToValue(cnooc_reservoir_facies3);
    let cnooc_reservoir_facies_cos = document.getElementById("cnooc_reservoir_facies_cos");

    for (let i = 0; i < cnooc_reservoir_facies_values.list81.length; i++) {
        if (cnooc_reservoir_quality == i) {
            if (cnooc_facies_type == 0) {
                if (cnooc_facies1 == 0) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list81[i];
                } else if (cnooc_facies1 == 1) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list82[i];
                } else if (cnooc_facies1 == 2) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list83[i];
                } else if (cnooc_facies1 == 3) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list84[i];
                }
            } else if (cnooc_facies_type == 1) {
                if (cnooc_facies2 == 0) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list85[i];
                } else if (cnooc_facies2 == 1) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list85[i];
                } else if (cnooc_facies2 == 2) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list86[i];
                }
            } else if (cnooc_facies_type == 2) {
                if (cnooc_facies3 == 0) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list87[i];
                } else if (cnooc_facies3 == 1) {
                    cnooc_reservoir_facies_cos.innerHTML = cnooc_reservoir_facies_values.list87[i];
                }
            }
        }
    }
}

// Reservoir Quality Inputs //
let cnooc_reservoir_depth = document.getElementById("cnooc_reservoir_quality");
let cnooc_reservoir_data_quality = document.getElementById("cnooc_reservoir_data_quality1");
let cnooc_reservoir_quality1 = document.getElementById("cnooc_reservoir_quality1");

let ccop_quality_selected = document.getElementById("ccop_quality_selected");
for(index in cos_values) {
    ccop_quality_selected.options[ccop_quality_selected.options.length] = new Option(cos_values[index], index);
};

// Reservoir Quality Constants //
const cnooc_reservoir_quality_values = {
    list88 : ["0.9-1.0", "0.8-0.9", "0.7-0.8", "0.6-0.7"],
    list89 : ["0.8-1.0", "0.7-0.8", "0.6-0.7", "0.4-0.6"],
    list90 : ["0.8-0.9", "0.7-0.8", "0.5-0.7", "0.4-0.5"],
    list91 : ["0.7-0.9", "0.6-0.7", "0.5-0.6", "0.3-0.5"],
    list92 : ["0.7-0.9", "0.5-0.7", "0.4-0.6", "0.3-0.5"],
    list93 : ["0.6-0.9", "0.3-0.5", "0.2-0.4", "0.1-0.3"]
}

// Reservoir Quality Function //
function cnoocReservoirQualityCos () {
    depth = convertToValue(cnooc_reservoir_depth);
    data_quality1 = convertToValue(cnooc_reservoir_data_quality);
    reservoir_quality = convertToValue(cnooc_reservoir_quality1);
    let cnooc_reservoir_quality_cos = document.getElementById("cnooc_reservoir_quality_cos");

    for (let i=0; i<cnooc_reservoir_quality_values.list88.length; i++) {
        if (data_quality1 == i) {
            if (reservoir_quality == 0) {
                if (depth == 0) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list88[i];
                } else if (depth == 1) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list90[i];
                } else if (depth == 2) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list92[i];
                }
            } else if (reservoir_quality == 1) {
                if (depth == 0) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list89[i];
                } else if (depth == 1) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list91[i];
                } else if (depth == 2) {
                    cnooc_reservoir_quality_cos.innerHTML = cnooc_reservoir_quality_values.list93[i];
                }
            }
        }    
    }
}

// CCOP Trapping Mechanism //
// Trapping Mechanism Seismic Interpretation Inputs //
let cnooc_correlation_type = document.getElementById("cnooc_correlation_type");
let cnooc_mapping_type = document.getElementById("cnooc_mapping_type");
let cnooc_seismic_trap = document.getElementById("cnooc_seismic_data_type");
let cnooc_seismic_grid = document.getElementById("cnooc_grid_size");

let ccop_interpret_selected = document.getElementById("ccop_interpret_selected");
for(index in cos_values) {
    ccop_interpret_selected.options[ccop_interpret_selected.options.length] = new Option(cos_values[index], index);
};

// Trapping Mechanism Seismic Dropdown Hide Function //
function hideDropdownCnoocSeismicTrap() {
    seismic_data = convertToValue(cnooc_seismic_trap);

    if (seismic_data == 0) {
        cnooc_seismic_grid.disabled = true
    } else if (seismic_data == 1) {
        cnooc_seismic_grid.disabled = false
    }
}

// Trapping Mechanism Seismic Interpretation Constants //
const cnooc_trapping_3dseismic_values = {
    list94 : ["0.9-1.0", "0.7-1.0", "0.6-0.9"],
    list95 : ["0.9-1.0", "0.7-0.9", "0.5-0.8"],
    list96 : ["0.9-1.0", "0.4-0.7", "0.3-0.7"],
}

const cnooc_trapping_2dseismic_values = {
    list97 : ["0.9-1.0", "0.8-1.0", "0.7-0.9"],
    list98 : ["0.6-0.9", "0.5-0.8", "0.4-0.7"],
    list99 : ["0.5-0.8", "0.4-0.7", "0.3-0.6"],
    list100 : ["0.8-1.0", "0.7-0.9", "0.5-0.8"],
    list101 : ["0.6-0.9", "0.4-0.8", "0.3-0.7"],
    list102 : ["0.4-0.7", "0.3-0.6", "0.2-0.5"],
    list103 : ["0.7-1.0", "0.6-0.8", "0.4-0.7"],
    list104 : ["0.3-0.6", "0.2-0.5", "0.1-0.4"],
    list105 : ["0.2-0.6", "0.1-0.5", "0.1-0.4"]
}

// Trapping Mechanism Seismic Interpretation Function //
function cnoocSeismicInterpretationCos () {
    correlation_type = convertToValue(cnooc_correlation_type);
    mapping_type = convertToValue(cnooc_mapping_type);
    trap_seismic = convertToValue(cnooc_seismic_trap);
    grid_type = convertToValue(cnooc_seismic_grid);
    let cnooc_seismic_interpretation_cos = document.getElementById("cnooc_seismic_interpretation_cos");

    // 3D Seismic Data Case //
    for (let i=0; i<cnooc_trapping_3dseismic_values.list94.length; i++) {
        if (trap_seismic == 0 && mapping_type == i) {
            if (correlation_type == 0) {
                cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_3dseismic_values.list94[i];
            } else if (correlation_type == 1) {
                cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_3dseismic_values.list95[i];
            } else if (correlation_type == 2) {
                cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_3dseismic_values.list96[i];
            }
        }
    }

    // 2D Seismic Data Case
    for (let i=0; i<cnooc_trapping_2dseismic_values.list97.length; i++) {
        if (grid_type == i) {
            if (correlation_type == 0) {
                if (mapping_type == 0) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list97[i];
                } else if (mapping_type == 1) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list98[i];    
                } else if (mapping_type == 2) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list99[i];    
                }
            } else if (correlation_type == 1) {
                if (mapping_type == 0) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list100[i];
                } else if (mapping_type == 1) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list101[i];    
                } else if (mapping_type == 2) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list102[i];    
                }
            } else if (correlation_type == 2) {
                if (mapping_type == 0) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list103[i];
                } else if (mapping_type == 1) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list104[i];    
                } else if (mapping_type == 2) {
                    cnooc_seismic_interpretation_cos.innerHTML = cnooc_trapping_2dseismic_values.list105[i];    
                }
            }
        }
    }
}

// Trapping Mechanism Seal Inputs //
let cnooc_seal_type = document.getElementById("cnooc_seal_type");
let cnooc_seal_top = document.getElementById("cnooc_seal_top");
let cnooc_seal_structure = document.getElementById("cnooc_seal_structure");
let cnooc_seal_quality = document.getElementById("cnooc_seal_data_quality");

let ccop_seal_selected = document.getElementById("ccop_seal_selected");
for(index in cos_values) {
    ccop_seal_selected.options[ccop_seal_selected.options.length] = new Option(cos_values[index], index);
};

// Trapping Mechanism Seal Dropdown Hide Function //
function hideDropdownCnoocSeal () {
    seal_cnooc = convertToValue (cnooc_seal_type);
    if (seal_cnooc == 0) {
        cnooc_seal_structure.disabled = true
        cnooc_seal_top.disabled = false
    } else if (seal_cnooc == 1) {
        cnooc_seal_structure.disabled = false
        cnooc_seal_top.disabled = true
    }
}

// Trapping Mechanism Seal Constants //
const cnooc_trapping_seal_values = {
    list106 : ["0.9-1.0", "0.8-1.0", "0.6-0.8", "0.4-0.6"],
    list107 : ["0.8-0.9", "0.7-0.8", "0.5-0.7", "0.3-0.5"],
    list108 : ["0.5-0.7", "0.4-0.5", "0.3-0.4", "0.1-0.3"],
    list109 : ["0.6-0.8", "0.5-0.6", "0.3-0.5", "0.1-0.3"],
    list110 : ["0.6-0.8", "0.5-0.7", "0.4-0.6", "0.1-0.3"],
    list111 : ["0.4-0.5", "0.3-0.5", "0.2-0.4", "0.1-0.3"]
}

function cnoocSealCos () {
    seal_simplicity = convertToValue(cnooc_seal_type);
    seal_top_cnooc = convertToValue(cnooc_seal_top);
    seal_structure = convertToValue(cnooc_seal_structure);
    seal_quality_cnooc = convertToValue(cnooc_seal_quality);
    let cnooc_seal_cos = document.getElementById("cnooc_seal_cos");

    for (let i=0; i<cnooc_trapping_seal_values.list106.length; i++) {
        if (seal_quality_cnooc==i) {
            if (seal_simplicity==0) {
                if (seal_top_cnooc==0) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list106[i];
                } else if (seal_top_cnooc==1) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list107[i];
                }
            } else if (seal_simplicity==1) {
                if (seal_structure==0) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list108[i];
                } else if (seal_structure==1) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list109[i];
                } else if (seal_structure==2) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list110[i];
                } else if (seal_structure==3) {
                    cnooc_seal_cos.innerHTML = cnooc_trapping_seal_values.list111[i];
                }  
            }
        }
    }
}

// CCOP Cumulative Seal COS Function //
function displayCcopSealCos () {
    let seismic_ccop = convertToValue(ccop_interpret_selected);
    let seal_ccop = convertToValue(ccop_seal_selected);
    let seal_result_ccop = document.getElementById("cnooc_cumulative_trapping_cos");

    let seal_ccop_cos = (seismic_ccop*seal_ccop)*100;
    seal_result_ccop.innerHTML = `% ${seal_ccop_cos.toFixed(2)}`
}

// CCOP Cumulative Reservoir COS Function //
function cnoocCumulativeReservoirCos() {
    let facies_ccop = convertToValue(ccop_facies_selected);
    let quality_ccop = convertToValue(ccop_quality_selected);
    let reservoir_result_ccop = document.getElementById("cnooc_cumulative_reservoir_cos");

    let reservoir_ccop_cos = (facies_ccop*quality_ccop)*100;
    reservoir_result_ccop.innerHTML = `% ${reservoir_ccop_cos.toFixed(2)}`
}

// CCOP Cumulative COS Function //
function displayCcopCos () {
    let ccop_source_cos = ccop_source_selected.value;
    let ccop_migration_cos = ccop_migration_selected.value;
    let ccop_facies_cos = ccop_facies_selected.value;
    let ccop_quality_cos = ccop_quality_selected.value;
    let ccop_interpret_cos = ccop_interpret_selected.value;
    let ccop_seal_cos = ccop_seal_selected.value;
    let ccop_preserve_cos = ccop_preserve_selected.value;

    let ccop_cumulative_cos = (ccop_source_cos*ccop_migration_cos*
        ccop_quality_cos*ccop_facies_cos*ccop_interpret_cos*
        ccop_seal_cos*ccop_preserve_cos)*100;
    
    let ccop_cumulative_result = document.getElementById("ccop_cumulative_cos");
    ccop_cumulative_result.innerHTML = `% ${ccop_cumulative_cos.toFixed(2)}`
}

// CCOP Cumulative COS Summary //
let ccop_click = document.getElementById("ccop_click");
let ccop_results_y = [];
var ccop_clicks = 0;

ccop_click.addEventListener ("click", function () {
    // CNOOC Results //
    let cnooc_source_cos = convertToValue(ccop_source_selected);
    let cnooc_migration_cos = convertToValue (ccop_migration_selected);
    let cnooc_facies_cos = convertToValue (ccop_facies_selected);
    let cnooc_quality_cos = convertToValue (ccop_quality_selected);
    let cnooc_interpret_cos = convertToValue (ccop_interpret_selected);
    let cnooc_seal_cos = convertToValue (ccop_seal_selected);
    let cnooc_preserve_cos = convertToValue (ccop_preserve_selected);

    ccop_clicks += 1;
    if (ccop_clicks==1) {
        ccop_results_y.push (
            cnooc_source_cos, 
            cnooc_facies_cos*cnooc_quality_cos, 
            cnooc_migration_cos, 
            cnooc_interpret_cos*cnooc_seal_cos, 
            cnooc_preserve_cos
        )
    } else if (ccop_clicks > 1) {
        ccop_results_y.length = 0;
        ccop_results_y.push (
            cnooc_source_cos, 
            cnooc_facies_cos*cnooc_quality_cos, 
            cnooc_migration_cos, 
            cnooc_interpret_cos*cnooc_seal_cos, 
            cnooc_preserve_cos
        )
    }

    alert ("CCOP's Approach Summary: \n Source Rock CoS: " + 
    cnooc_source_cos + "\n Reservoir Rock CoS: " + (cnooc_facies_cos*cnooc_quality_cos).toFixed(2) +
    "\n Migration CoS: " + cnooc_migration_cos +
    "\n Trap CoS: " + (cnooc_interpret_cos*cnooc_seal_cos).toFixed(2) +
    "\n Preservation CoS: " + cnooc_preserve_cos
    )
    return ccop_results_y
})

function generateGraph() {
    // Declaration of Function Variables //
    let ps_elements = [
        "Source Rock", 
        "Reservoir Rock", 
        "Migration", 
        "Trap", 
        "Preservation"
    ];

    let prospect_name = document.getElementById ("prospect").value;
    chart_type = document.getElementById("chart_type");
    let chart = convertToValue (chart_type);

    let bar_data = [{
        y:milkov_results_y,
        x:ps_elements,
        type:"bar",
        orientation:"v",
        marker: {
            color:"blue"
        },
        width: 0.2,
        name: "Milkov's Approach"
    }, {
        y:ccop_results_y,
        x:ps_elements,
        type:"bar",
        orientation:"v",
        marker: {
            color:"red"
        },
        width: 0.2,
        name: "CCOP's Approach"
    }, {
        y:croatian_results_y,
        x:ps_elements,
        type:"bar",
        orientation:"v",
        marker: {
            color:"black"
        },
        width: 0.2,
        name: "Croatian Approach"
    }];

    let bar_layout = {
        title: `CoS Comparison Graph of ${prospect_name}`,
        yaxis: {
            title: "Chance of Success (CoS)",
            range: [0, 1],
            ticks: "outside",
            ticklen: 5,
            tickwidth: 0.2
        },
        xaxis: {
            title: "Petroleum System Elements",
            ticks: "outside",
            ticklen: 5
        },
        showlegend: true,
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1
    };

    let radar_data = [{
        r:milkov_results_y,
        theta:ps_elements,
        type:"scatterpolar",
        fill:"toself",
        name: "Milkov's Approach",
        line: {
            color: "blue"
        }
    }, {
        r:ccop_results_y,
        theta:ps_elements,
        type:"scatterpolar",
        fill:"toself",
        line: {
            color: "brown"
        },
        name: "CCOP's Approach"
    }, {
        r:croatian_results_y,
        theta:ps_elements,
        type:"scatterpolar",
        fill:"toself",
        line: {
            color: "black"
        },
        name: "Croatian Approach"
    }];

    let radar_layout = {
        title: `CoS Comparison Graph of ${prospect_name}`,
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 1]
          }
        }
    }

    if (chart == 0) {
        // return bar_chart;
        Plotly.newPlot("plotly_graph", bar_data, bar_layout);
    } else if (chart == 1) {
        // return radar_chart;
        Plotly.newPlot("plotly_graph", radar_data, radar_layout);
    }
};
