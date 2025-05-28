package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestOgolneRejestracja
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class RequestOgolneRejestracja   {
  @JsonProperty("email")
  private String email = null;

  @JsonProperty("login")
  private String login = null;

  @JsonProperty("haslo")
  private String haslo = null;

  /**
   * Gets or Sets typUzytkownika
   */
  public enum TypUzytkownikaEnum {
    GOSC("gosc"),
    
    ARTYSTA("artysta"),
    
    HOTEL("hotel");

    private String value;

    TypUzytkownikaEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static TypUzytkownikaEnum fromValue(String text) {
      for (TypUzytkownikaEnum b : TypUzytkownikaEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }
  @JsonProperty("typ_uzytkownika")
  private TypUzytkownikaEnum typUzytkownika = null;

  public RequestOgolneRejestracja email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Get email
   * @return email
   **/
  @Schema(example = "jan.kowalski@example.com", required = true, description = "")
      @NotNull

    public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public RequestOgolneRejestracja login(String login) {
    this.login = login;
    return this;
  }

  /**
   * Get login
   * @return login
   **/
  @Schema(example = "jan_kowalski", required = true, description = "")
      @NotNull

    public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public RequestOgolneRejestracja haslo(String haslo) {
    this.haslo = haslo;
    return this;
  }

  /**
   * Get haslo
   * @return haslo
   **/
  @Schema(example = "haslo123", required = true, description = "")
      @NotNull

    public String getHaslo() {
    return haslo;
  }

  public void setHaslo(String haslo) {
    this.haslo = haslo;
  }

  public RequestOgolneRejestracja typUzytkownika(TypUzytkownikaEnum typUzytkownika) {
    this.typUzytkownika = typUzytkownika;
    return this;
  }

  /**
   * Get typUzytkownika
   * @return typUzytkownika
   **/
  @Schema(example = "gosc", required = true, description = "")
      @NotNull

    public TypUzytkownikaEnum getTypUzytkownika() {
    return typUzytkownika;
  }

  public void setTypUzytkownika(TypUzytkownikaEnum typUzytkownika) {
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
    RequestOgolneRejestracja requestOgolneRejestracja = (RequestOgolneRejestracja) o;
    return Objects.equals(this.email, requestOgolneRejestracja.email) &&
        Objects.equals(this.login, requestOgolneRejestracja.login) &&
        Objects.equals(this.haslo, requestOgolneRejestracja.haslo) &&
        Objects.equals(this.typUzytkownika, requestOgolneRejestracja.typUzytkownika);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email, login, haslo, typUzytkownika);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestOgolneRejestracja {\n");
    
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    login: ").append(toIndentedString(login)).append("\n");
    sb.append("    haslo: ").append(toIndentedString(haslo)).append("\n");
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
