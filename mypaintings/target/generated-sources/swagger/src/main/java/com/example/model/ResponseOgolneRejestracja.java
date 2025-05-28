package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseOgolneRejestracja
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseOgolneRejestracja   {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("email")
  private String email = null;

  @JsonProperty("login")
  private String login = null;

  @JsonProperty("typ_uzytkownika")
  private String typUzytkownika = null;

  public ResponseOgolneRejestracja id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   **/
  @Schema(example = "1", description = "")
  
    public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public ResponseOgolneRejestracja email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Get email
   * @return email
   **/
  @Schema(example = "jan.kowalski@example.com", description = "")
  
    public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public ResponseOgolneRejestracja login(String login) {
    this.login = login;
    return this;
  }

  /**
   * Get login
   * @return login
   **/
  @Schema(example = "jan_kowalski", description = "")
  
    public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public ResponseOgolneRejestracja typUzytkownika(String typUzytkownika) {
    this.typUzytkownika = typUzytkownika;
    return this;
  }

  /**
   * Get typUzytkownika
   * @return typUzytkownika
   **/
  @Schema(example = "gosc", description = "")
  
    public String getTypUzytkownika() {
    return typUzytkownika;
  }

  public void setTypUzytkownika(String typUzytkownika) {
    this.typUzytkownika = typUzytkownika;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseOgolneRejestracja responseOgolneRejestracja = (ResponseOgolneRejestracja) o;
    return Objects.equals(this.id, responseOgolneRejestracja.id) &&
        Objects.equals(this.email, responseOgolneRejestracja.email) &&
        Objects.equals(this.login, responseOgolneRejestracja.login) &&
        Objects.equals(this.typUzytkownika, responseOgolneRejestracja.typUzytkownika);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, email, login, typUzytkownika);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseOgolneRejestracja {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    login: ").append(toIndentedString(login)).append("\n");
    sb.append("    typUzytkownika: ").append(toIndentedString(typUzytkownika)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
